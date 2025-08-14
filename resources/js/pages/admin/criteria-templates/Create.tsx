import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { CriteriaTemplateForm } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CriteriaTemplateForm>({
        name: '',
        description: '',

        // Level 2 Criteria Group 1 Values
        l2_cg1_a_value: '0',
        l2_cg1_b_value: '0',
        l2_cg1_c_value: '0',
        l2_cg1_d_value: '0',
        l2_cg1_e_value: '0',

        // Level 2 Criteria Group 1 Max Flags
        l2_cg1_a_max: false,
        l2_cg1_b_max: false,
        l2_cg1_c_max: false,
        l2_cg1_d_max: false,
        l2_cg1_e_max: false,

        // Level 2 Criteria Group 2 Values
        l2_cg2_a_value: '0',
        l2_cg2_b_value: '0',
        l2_cg2_c_value: '0',
        l2_cg2_d_value: '0',

        // Level 2 Criteria Group 2 Max Flags
        l2_cg2_a_max: false,
        l2_cg2_b_max: false,
        l2_cg2_c_max: false,
        l2_cg2_d_max: false,

        // Level 2 Criteria Group 3 Values
        l2_cg3_a_value: '0',
        l2_cg3_b_value: '0',
        l2_cg3_c_value: '0',
        l2_cg3_d_value: '0',
        l2_cg3_e_value: '0',

        // Level 2 Criteria Group 3 Max Flags
        l2_cg3_a_max: false,
        l2_cg3_b_max: false,
        l2_cg3_c_max: false,
        l2_cg3_d_max: false,
        l2_cg3_e_max: false,

        // Level 1 Criteria Group 1 Values
        l1_cg1_a_value: '0',
        l1_cg1_b_value: '0',
        l1_cg1_c_value: '0',

        // Level 1 Criteria Group 1 Max Flags
        l1_cg1_a_max: false,
        l1_cg1_b_max: false,
        l1_cg1_c_max: false,

        // Result settings
        limit: 10,
        ascending: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.criteria-templates.store'));
    };

    return (
        <AdminLayout title="Tambah Template Kriteria" description="Buat template kriteria baru">
            <Head title="Tambah Template Kriteria" />

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
                            <h2 className="text-2xl font-bold tracking-tight">Tambah Template Kriteria</h2>
                            <p className="text-muted-foreground">Buat template kriteria penilaian baru</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Dasar</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Template *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama template"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Masukkan deskripsi template"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Level 2 Criteria Group 1 */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Level 2 Criteria Group 1 - App Metrics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                    {[
                                        { letter: 'a', label: 'Ukuran File' },
                                        { letter: 'b', label: 'Total Rating' },
                                        { letter: 'c', label: 'User Rated' },
                                        { letter: 'd', label: 'Total Install' },
                                        { letter: 'e', label: 'Release Date' },
                                    ].map(({ letter, label }) => (
                                        <div key={letter} className="space-y-2">
                                            <Label htmlFor={`l2_cg1_${letter}_value`}>{label}</Label>
                                            <Input
                                                id={`l2_cg1_${letter}_value`}
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data[`l2_cg1_${letter}_value` as keyof typeof data] as string}
                                                onChange={(e) =>
                                                    setData((currentData) => ({
                                                        ...currentData,
                                                        [`l2_cg1_${letter}_value`]: e.target.value,
                                                    }))
                                                }
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id={`l2_cg1_${letter}_max`}
                                                    checked={
                                                        data[`l2_cg1_${letter}_max` as keyof typeof data] as boolean
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        setData((currentData) => ({
                                                            ...currentData,
                                                            [`l2_cg1_${letter}_max`]: checked,
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={`l2_cg1_${letter}_max`}>
                                                    {data[`l2_cg1_${letter}_max` as keyof typeof data] ? 'MAX' : 'MIN'}
                                                </Label>
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
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    {[
                                        { letter: 'a', label: 'Giro' },
                                        { letter: 'b', label: 'Tabungan' },
                                        { letter: 'c', label: 'Deposito' },
                                        { letter: 'd', label: 'Laba Bersih' },
                                    ].map(({ letter, label }) => (
                                        <div key={letter} className="space-y-2">
                                            <Label htmlFor={`l2_cg2_${letter}_value`}>{label}</Label>
                                            <Input
                                                id={`l2_cg2_${letter}_value`}
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data[`l2_cg2_${letter}_value` as keyof typeof data] as string}
                                                onChange={(e) =>
                                                    setData((currentData) => ({
                                                        ...currentData,
                                                        [`l2_cg2_${letter}_value`]: e.target.value,
                                                    }))
                                                }
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id={`l2_cg2_${letter}_max`}
                                                    checked={
                                                        data[`l2_cg2_${letter}_max` as keyof typeof data] as boolean
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        setData((currentData) => ({
                                                            ...currentData,
                                                            [`l2_cg2_${letter}_max`]: checked,
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={`l2_cg2_${letter}_max`}>
                                                    {data[`l2_cg2_${letter}_max` as keyof typeof data] ? 'MAX' : 'MIN'}
                                                </Label>
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
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                    {[
                                        { letter: 'a', label: 'Happiness' },
                                        { letter: 'b', label: 'Engagement' },
                                        { letter: 'c', label: 'Adoption' },
                                        { letter: 'd', label: 'Retention' },
                                        { letter: 'e', label: 'Task Success' },
                                    ].map(({ letter, label }) => (
                                        <div key={letter} className="space-y-2">
                                            <Label htmlFor={`l2_cg3_${letter}_value`}>{label}</Label>
                                            <Input
                                                id={`l2_cg3_${letter}_value`}
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data[`l2_cg3_${letter}_value` as keyof typeof data] as string}
                                                onChange={(e) =>
                                                    setData((currentData) => ({
                                                        ...currentData,
                                                        [`l2_cg3_${letter}_value`]: e.target.value,
                                                    }))
                                                }
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id={`l2_cg3_${letter}_max`}
                                                    checked={
                                                        data[`l2_cg3_${letter}_max` as keyof typeof data] as boolean
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        setData((currentData) => ({
                                                            ...currentData,
                                                            [`l2_cg3_${letter}_max`]: checked,
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={`l2_cg3_${letter}_max`}>
                                                    {data[`l2_cg3_${letter}_max` as keyof typeof data] ? 'MAX' : 'MIN'}
                                                </Label>
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
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {[
                                        { letter: 'a', label: 'Performa Apps' },
                                        { letter: 'b', label: 'Laporan Keuangan' },
                                        { letter: 'c', label: 'User Experience' },
                                    ].map(({ letter, label }) => (
                                        <div key={letter} className="space-y-2">
                                            <Label htmlFor={`l1_cg1_${letter}_value`}>{label}</Label>
                                            <Input
                                                id={`l1_cg1_${letter}_value`}
                                                type="number"
                                                step="0.000001"
                                                min="0"
                                                max="10000"
                                                value={data[`l1_cg1_${letter}_value` as keyof typeof data] as string}
                                                onChange={(e) =>
                                                    setData((currentData) => ({
                                                        ...currentData,
                                                        [`l1_cg1_${letter}_value`]: e.target.value,
                                                    }))
                                                }
                                                placeholder="0.00"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id={`l1_cg1_${letter}_max`}
                                                    checked={
                                                        data[`l1_cg1_${letter}_max` as keyof typeof data] as boolean
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        setData((currentData) => ({
                                                            ...currentData,
                                                            [`l1_cg1_${letter}_max`]: checked,
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={`l1_cg1_${letter}_max`}>
                                                    {data[`l1_cg1_${letter}_max` as keyof typeof data] ? 'MAX' : 'MIN'}
                                                </Label>
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
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="limit">Limit Hasil</Label>
                                        <Input
                                            id="limit"
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={data.limit}
                                            onChange={(e) => setData('limit', parseInt(e.target.value))}
                                            placeholder="10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ascending">Urutan</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="ascending"
                                                checked={data.ascending}
                                                onCheckedChange={(checked) => setData('ascending', checked)}
                                            />
                                            <Label htmlFor="ascending">
                                                {data.ascending
                                                    ? 'Ascending (Terendah ke Tertinggi)'
                                                    : 'Descending (Tertinggi ke Terendah)'}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Template'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
