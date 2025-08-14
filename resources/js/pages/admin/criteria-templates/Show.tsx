import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, FileText } from 'lucide-react';

interface CriteriaTemplate {
    id: number;
    name: string;
    description: string | null;

    // Level 2 Criteria Group 1 Values
    l2_cg1_a_value: number | null;
    l2_cg1_b_value: number | null;
    l2_cg1_c_value: number | null;
    l2_cg1_d_value: number | null;
    l2_cg1_e_value: number | null;

    // Level 2 Criteria Group 1 Max Flags
    l2_cg1_a_max: boolean;
    l2_cg1_b_max: boolean;
    l2_cg1_c_max: boolean;
    l2_cg1_d_max: boolean;
    l2_cg1_e_max: boolean;

    // Level 2 Criteria Group 2 Values
    l2_cg2_a_value: number | null;
    l2_cg2_b_value: number | null;
    l2_cg2_c_value: number | null;
    l2_cg2_d_value: number | null;

    // Level 2 Criteria Group 2 Max Flags
    l2_cg2_a_max: boolean;
    l2_cg2_b_max: boolean;
    l2_cg2_c_max: boolean;
    l2_cg2_d_max: boolean;

    // Level 2 Criteria Group 3 Values
    l2_cg3_a_value: number | null;
    l2_cg3_b_value: number | null;
    l2_cg3_c_value: number | null;
    l2_cg3_d_value: number | null;
    l2_cg3_e_value: number | null;

    // Level 2 Criteria Group 3 Max Flags
    l2_cg3_a_max: boolean;
    l2_cg3_b_max: boolean;
    l2_cg3_c_max: boolean;
    l2_cg3_d_max: boolean;
    l2_cg3_e_max: boolean;

    // Level 1 Criteria Group 1 Values
    l1_cg1_a_value: number | null;
    l1_cg1_b_value: number | null;
    l1_cg1_c_value: number | null;

    // Level 1 Criteria Group 1 Max Flags
    l1_cg1_a_max: boolean;
    l1_cg1_b_max: boolean;
    l1_cg1_c_max: boolean;

    limit: number;
    ascending: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    criteriaTemplate: CriteriaTemplate;
}

export default function Show({ criteriaTemplate }: Props) {
    const formatValue = (value: number | string | null) => {
        if (value === null) return '-';
        return parseFloat(value as string).toFixed(6);
    };

    const getMaxBadge = (isMax: boolean) => {
        return isMax ? (
            <Badge variant="default" className="ml-2">
                MAX
            </Badge>
        ) : (
            <Badge variant="secondary" className="ml-2">
                MIN
            </Badge>
        );
    };

    return (
        <AdminLayout title={criteriaTemplate.name} description="Detail template kriteria">
            <Head title={criteriaTemplate.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.criteria-templates.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{criteriaTemplate.name}</h2>
                            <p className="text-muted-foreground">Detail template kriteria penilaian</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.criteria-templates.edit', criteriaTemplate.id)}>
                            <Button size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Informasi Dasar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Nama Template</h4>
                                <p className="text-lg">{criteriaTemplate.name}</p>
                            </div>
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Deskripsi</h4>
                                <p className="text-lg">{criteriaTemplate.description || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Level 2 Criteria Group 1 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Level 2 Criteria Group 1 - App Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            {[
                                { key: 'l2_cg1_a_value', label: 'Ukuran File', max: 'l2_cg1_a_max' },
                                { key: 'l2_cg1_b_value', label: 'Total Rating', max: 'l2_cg1_b_max' },
                                { key: 'l2_cg1_c_value', label: 'User Rated', max: 'l2_cg1_c_max' },
                                { key: 'l2_cg1_d_value', label: 'Total Install', max: 'l2_cg1_d_max' },
                                { key: 'l2_cg1_e_value', label: 'Release Date', max: 'l2_cg1_e_max' },
                            ].map(({ key, label, max }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(criteriaTemplate[key as keyof CriteriaTemplate] as number)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate[max as keyof CriteriaTemplate] as boolean)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Level 2 Criteria Group 2 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Level 2 Criteria Group 2 - Financial Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {[
                                { key: 'l2_cg2_a_value', label: 'Giro', max: 'l2_cg2_a_max' },
                                { key: 'l2_cg2_b_value', label: 'Tabungan', max: 'l2_cg2_b_max' },
                                { key: 'l2_cg2_c_value', label: 'Deposito', max: 'l2_cg2_c_max' },
                                { key: 'l2_cg2_d_value', label: 'Laba Bersih', max: 'l2_cg2_d_max' },
                            ].map(({ key, label, max }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(criteriaTemplate[key as keyof CriteriaTemplate] as number)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate[max as keyof CriteriaTemplate] as boolean)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Level 2 Criteria Group 3 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Level 2 Criteria Group 3 - User Experience Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            {[
                                { key: 'l2_cg3_a_value', label: 'Happiness', max: 'l2_cg3_a_max' },
                                { key: 'l2_cg3_b_value', label: 'Engagement', max: 'l2_cg3_b_max' },
                                { key: 'l2_cg3_c_value', label: 'Adoption', max: 'l2_cg3_c_max' },
                                { key: 'l2_cg3_d_value', label: 'Retention', max: 'l2_cg3_d_max' },
                                { key: 'l2_cg3_e_value', label: 'Task Success', max: 'l2_cg3_e_max' },
                            ].map(({ key, label, max }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(criteriaTemplate[key as keyof CriteriaTemplate] as number)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate[max as keyof CriteriaTemplate] as boolean)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Level 1 Criteria Group 1 */}
                <Card>
                    <CardHeader>
                        <CardTitle>Level 1 Criteria Group 1 - Overall Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                { key: 'l1_cg1_a_value', label: 'Performa Apps', max: 'l1_cg1_a_max' },
                                { key: 'l1_cg1_b_value', label: 'Laporan Keuangan', max: 'l1_cg1_b_max' },
                                { key: 'l1_cg1_c_value', label: 'User Experience', max: 'l1_cg1_c_max' },
                            ].map(({ key, label, max }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(criteriaTemplate[key as keyof CriteriaTemplate] as number)}
                                        </span>
                                        {getMaxBadge(criteriaTemplate[max as keyof CriteriaTemplate] as boolean)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Result Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pengaturan Hasil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Limit Hasil</h4>
                                <p className="text-lg">{criteriaTemplate.limit}</p>
                            </div>
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Urutan</h4>
                                <p className="text-lg">
                                    {criteriaTemplate.ascending
                                        ? 'Ascending (Terendah ke Tertinggi)'
                                        : 'Descending (Tertinggi ke Terendah)'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Timestamps */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Sistem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Dibuat Pada</h4>
                                <p className="text-sm">
                                    {new Date(criteriaTemplate.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Terakhir Diperbarui</h4>
                                <p className="text-sm">
                                    {new Date(criteriaTemplate.updated_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
