<?php

namespace App\Modules\MagiqMarcos;

class MagiqMarcos
{
    /**
     * Summary of __construct
     * @param array<ObjectEntity> $objects
     */
    public function __construct(
        public array $objects
    ) {
    }

    /**
     * Summary of calculate
     * @param UserCriteria $criteria
     */
    public function calculate(
        UserCriteria $criteria
    ) {
        $level2 = $this->calculateLvl2($criteria);
        $level1 = $this->calculateLvl1($criteria, $level2);

        $flattenResult = [];
        foreach ($level1->pref as $objectId => $prefScore) {
            $flattenResult[] = new MagiqMarcosResult(
                array_find($this->objects, fn($q) => $q->id === $objectId),
                $prefScore
            );
        }

        // sorting
        if ($criteria->ascending) {
            usort(
                $flattenResult,
                fn($a, $b) =>
                $a->prefScore <=> $b->prefScore
            );
        } else {
            usort(
                $flattenResult,
                fn($a, $b) =>
                $b->prefScore <=> $a->prefScore
            );
        }

        // cut the limit
        $flattenResult = array_slice($flattenResult, 0, $criteria->limit);

        return $flattenResult;
    }

    private function calculateLvl1(UserCriteria $criteria, CalculationLVL2Result $level2Result)
    {
        // mencari min dan max dari setiap object
        $criteriaMins = [];
        $criteriaMaxs = [];
        $props = [
            'l1_cg1_a',
            'l1_cg1_b',
            'l1_cg1_c'
        ];
        foreach ($this->objects as $object) {
            foreach ($props as $prop) {
                $objectValue = $level2Result->pref[$object->id][$prop];
                $criteriaMins[$prop] = min($criteriaMins[$prop] ?? $objectValue, $objectValue);
                $criteriaMaxs[$prop] = max($criteriaMaxs[$prop] ?? $objectValue, $objectValue);
            }
        }

        $normalizedObjects = [];
        foreach ($this->objects as $object) {
            foreach ($props as $prop) {
                $objectValue = $level2Result->pref[$object->id][$prop];
                if ($criteria->{$prop . '_max'}) {
                    $normalizedObjects[$object->id][$prop] = $objectValue / $criteriaMaxs[$prop];
                } else {
                    $normalizedObjects[$object->id][$prop] = $criteriaMins[$prop] / $objectValue;
                }
            }
        }

        $alternativeObjects = [];
        foreach ($normalizedObjects as $objectId => $object) {

            foreach ($props as $prop) {
                $alternativeObjects[$objectId][$prop] = $criteria->{$prop . '_value'} * $normalizedObjects[$objectId][$prop];
            }
        }

        // anti ideal & ideal
        $antiIdealDistance = [];
        $idealDistance = [];
        foreach ($props as $prop) {
            foreach ($alternativeObjects as $objectId => $object) {
                $antiIdealDistance[$prop] = min($antiIdealDistance[$prop] ?? $object[$prop], $object[$prop]);
                $idealDistance[$prop] = max($idealDistance[$prop] ?? $object[$prop], $object[$prop]);
            }
        }

        $sumCG = [];
        foreach ($alternativeObjects as $objectId => $object) {
            $sumCG[$objectId]['sum_cg1'] = array_sum([
                $object['l1_cg1_a'],
                $object['l1_cg1_b'],
                $object['l1_cg1_c'],
            ]);
        }

        $finalSum = [];
        $finalSum['cg1'] = [
            'notIdeal' => array_sum([
                $antiIdealDistance['l1_cg1_a'],
                $antiIdealDistance['l1_cg1_b'],
                $antiIdealDistance['l1_cg1_c'],
            ]),
            'ideal' => array_sum([
                $idealDistance['l1_cg1_a'],
                $idealDistance['l1_cg1_b'],
                $idealDistance['l1_cg1_c'],
            ])
        ];

        // FINAL
        $final = [];
        foreach ($sumCG as $objectId => $object) {
            $final[$objectId] = [];

            $final[$objectId]['ki_min_cg1'] = $object['sum_cg1'] / $finalSum['cg1']['notIdeal'];
            $final[$objectId]['ki_max_cg1'] = $object['sum_cg1'] / $finalSum['cg1']['ideal'];
        }

        $firstKey = array_key_first($final);

        // FINAL F
        $finalF = [
            'ki_min_cg1' => $final[$firstKey]['ki_min_cg1'] / ($final[$firstKey]['ki_min_cg1'] + $final[$firstKey]['ki_max_cg1']),
            'ki_max_cg1' => $final[$firstKey]['ki_max_cg1'] / ($final[$firstKey]['ki_min_cg1'] + $final[$firstKey]['ki_max_cg1']),
        ];

        $finalPref = [];

        foreach ($final as $objectId => $f) {
            $resultCG1 = ($f['ki_min_cg1'] + $f['ki_max_cg1']) / (1 + ((1 - $finalF['ki_max_cg1']) / $finalF['ki_max_cg1']) + ((1 - $finalF['ki_min_cg1']) / $finalF['ki_min_cg1']));

            $finalPref[$objectId] = [];
            $finalPref[$objectId] = $resultCG1;
        }

        return new CalculationLVL1Result(
            pref: $finalPref,
            finalF: $finalF,
            sumCG: $sumCG
        );
    }

    private function calculateLvl2(UserCriteria $criteria)
    {
        // mencari min dan max dari setiap object
        $criteriaMins = [];
        $criteriaMaxs = [];

        $props = [
            'l2_cg1_a',
            'l2_cg1_b',
            'l2_cg1_c',
            'l2_cg1_d',
            'l2_cg1_e',
            'l2_cg2_a',
            'l2_cg2_b',
            'l2_cg2_c',
            'l2_cg2_d',
            'l2_cg3_a',
            'l2_cg3_b',
            'l2_cg3_c',
            'l2_cg3_d',
            'l2_cg3_e',
        ];
        foreach ($this->objects as $object) {
            foreach ($props as $prop) {
                $criteriaMins[$prop] = min($criteriaMins[$prop] ?? $object->$prop, $object->$prop);
                $criteriaMaxs[$prop] = max($criteriaMaxs[$prop] ?? $object->$prop, $object->$prop);
            }
        }

        $normalizedObjects = [];
        foreach ($this->objects as $object) {
            foreach ($props as $prop) {
                if ($criteria->{$prop . '_max'}) {
                    $normalizedObjects[$object->id][$prop] = $object->$prop / $criteriaMaxs[$prop];
                } else {
                    $normalizedObjects[$object->id][$prop] = $criteriaMins[$prop] / $object->$prop;
                }
            }
        }

        $alternativeObjects = [];
        foreach ($normalizedObjects as $objectId => $object) {
            foreach ($props as $prop) {
                $alternativeObjects[$objectId][$prop] = $criteria->{$prop . '_value'} * $normalizedObjects[$objectId][$prop];
            }
        }

        // anti ideal & ideal
        $antiIdealDistance = [];
        $idealDistance = [];
        foreach ($props as $prop) {
            foreach ($alternativeObjects as $objectId => $object) {
                $antiIdealDistance[$prop] = min($antiIdealDistance[$prop] ?? $object[$prop], $object[$prop]);
                $idealDistance[$prop] = max($idealDistance[$prop] ?? $object[$prop], $object[$prop]);
            }
        }

        $sumCG = [];
        foreach ($alternativeObjects as $objectId => $object) {
            $sumCG[$objectId]['sum_cg1'] = array_sum([
                $object['l2_cg1_a'],
                $object['l2_cg1_b'],
                $object['l2_cg1_c'],
                $object['l2_cg1_d'],
                $object['l2_cg1_e'],
            ]);
            $sumCG[$objectId]['sum_cg2'] = array_sum([
                $object['l2_cg2_a'],
                $object['l2_cg2_b'],
                $object['l2_cg2_c'],
                $object['l2_cg2_d'],
            ]);
            $sumCG[$objectId]['sum_cg3'] = array_sum([
                $object['l2_cg3_a'],
                $object['l2_cg3_b'],
                $object['l2_cg3_c'],
                $object['l2_cg3_d'],
                $object['l2_cg3_e'],
            ]);
        }

        $finalSum = [];
        $finalSum['cg1'] = [
            'notIdeal' => array_sum([
                $antiIdealDistance['l2_cg1_a'],
                $antiIdealDistance['l2_cg1_b'],
                $antiIdealDistance['l2_cg1_c'],
                $antiIdealDistance['l2_cg1_d'],
                $antiIdealDistance['l2_cg1_e'],
            ]),
            'ideal' => array_sum([
                $idealDistance['l2_cg1_a'],
                $idealDistance['l2_cg1_b'],
                $idealDistance['l2_cg1_c'],
                $idealDistance['l2_cg1_d'],
                $idealDistance['l2_cg1_e'],
            ])
        ];
        $finalSum['cg2'] = [
            'notIdeal' => array_sum([
                $antiIdealDistance['l2_cg2_a'],
                $antiIdealDistance['l2_cg2_b'],
                $antiIdealDistance['l2_cg2_c'],
                $antiIdealDistance['l2_cg2_d'],
            ]),
            'ideal' => array_sum([
                $idealDistance['l2_cg2_a'],
                $idealDistance['l2_cg2_b'],
                $idealDistance['l2_cg2_c'],
                $idealDistance['l2_cg2_d'],
            ])
        ];
        $finalSum['cg3'] = [
            'notIdeal' => array_sum([
                $antiIdealDistance['l2_cg3_a'],
                $antiIdealDistance['l2_cg3_b'],
                $antiIdealDistance['l2_cg3_c'],
                $antiIdealDistance['l2_cg3_d'],
                $antiIdealDistance['l2_cg3_e'],
            ]),
            'ideal' => array_sum([
                $idealDistance['l2_cg3_a'],
                $idealDistance['l2_cg3_b'],
                $idealDistance['l2_cg3_c'],
                $idealDistance['l2_cg3_d'],
                $idealDistance['l2_cg3_e'],
            ])
        ];

        // FINAL
        $final = [];
        foreach ($sumCG as $objectId => $object) {
            $final[$objectId] = [];
            $final[$objectId]['ki_min_cg1'] = $object['sum_cg1'] / $finalSum['cg1']['notIdeal'];
            $final[$objectId]['ki_max_cg1'] = $object['sum_cg1'] / $finalSum['cg1']['ideal'];
            $final[$objectId]['ki_min_cg2'] = $object['sum_cg2'] / $finalSum['cg2']['notIdeal'];
            $final[$objectId]['ki_max_cg2'] = $object['sum_cg2'] / $finalSum['cg2']['ideal'];
            $final[$objectId]['ki_min_cg3'] = $object['sum_cg3'] / $finalSum['cg3']['notIdeal'];
            $final[$objectId]['ki_max_cg3'] = $object['sum_cg3'] / $finalSum['cg3']['ideal'];
        }

        $firstKey = array_key_first($final);

        // FINAL F
        $finalF = [
            'ki_min_cg1' => $final[$firstKey]['ki_min_cg1'] / ($final[$firstKey]['ki_min_cg1'] + $final[$firstKey]['ki_max_cg1']),
            'ki_max_cg1' => $final[$firstKey]['ki_max_cg1'] / ($final[$firstKey]['ki_min_cg1'] + $final[$firstKey]['ki_max_cg1']),

            'ki_min_cg2' => $final[$firstKey]['ki_min_cg2'] / ($final[$firstKey]['ki_min_cg2'] + $final[$firstKey]['ki_max_cg2']),
            'ki_max_cg2' => $final[$firstKey]['ki_max_cg2'] / ($final[$firstKey]['ki_min_cg2'] + $final[$firstKey]['ki_max_cg2']),

            'ki_min_cg3' => $final[$firstKey]['ki_min_cg3'] / ($final[$firstKey]['ki_min_cg3'] + $final[$firstKey]['ki_max_cg3']),
            'ki_max_cg3' => $final[$firstKey]['ki_max_cg3'] / ($final[$firstKey]['ki_min_cg3'] + $final[$firstKey]['ki_max_cg3']),
        ];

        $finalPref = [];

        foreach ($final as $objectId => $f) {
            $resultCG1 = ($f['ki_min_cg1'] + $f['ki_max_cg1']) / (1 + ((1 - $finalF['ki_max_cg1']) / $finalF['ki_max_cg1']) + ((1 - $finalF['ki_min_cg1']) / $finalF['ki_min_cg1']));
            $resultCG2 = ($f['ki_min_cg2'] + $f['ki_max_cg2']) / (1 + ((1 - $finalF['ki_max_cg2']) / $finalF['ki_max_cg2']) + ((1 - $finalF['ki_min_cg2']) / $finalF['ki_min_cg2']));
            $resultCG3 = ($f['ki_min_cg3'] + $f['ki_max_cg3']) / (1 + ((1 - $finalF['ki_max_cg3']) / $finalF['ki_max_cg3']) + ((1 - $finalF['ki_min_cg3']) / $finalF['ki_min_cg3']));

            $finalPref[$objectId] = [];
            $finalPref[$objectId]['l1_cg1_a'] = $resultCG1;
            $finalPref[$objectId]['l1_cg1_b'] = $resultCG2;
            $finalPref[$objectId]['l1_cg1_c'] = $resultCG3;
        }

        return new CalculationLVL2Result(
            pref: $finalPref,
            finalF: $finalF,
            sumCG: $sumCG
        );
    }
}

class MagiqMarcosResult
{
    public function __construct(
        public ObjectEntity $objectEntity,
        public float $prefScore
    ) {
    }
}

class CalculationLVL2Result
{
    public function __construct(
        public array $pref,
        public array $finalF,
        public array $sumCG
    ) {
    }
}

class CalculationLVL1Result
{
    public function __construct(
        public array $pref,
        public array $finalF,
        public array $sumCG
    ) {
    }
}