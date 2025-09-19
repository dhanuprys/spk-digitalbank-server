import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { ObjectMetricForm } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface ObjectMetric {
    id: number;
    name: string;

    // Level 2 Criteria Group 1
    l2_cg1_a: number | null;
    l2_cg1_b: number | null;
    l2_cg1_c: number | null;
    l2_cg1_d: number | null;
    l2_cg1_e: number | null;

    // Level 2 Criteria Group 2
    l2_cg2_a: number | null;
    l2_cg2_b: number | null;
    l2_cg2_c: number | null;
    l2_cg2_d: number | null;

    // Level 2 Criteria Group 3
    l2_cg3_a: number | null;
    l2_cg3_b: number | null;
    l2_cg3_c: number | null;
    l2_cg3_d: number | null;
    l2_cg3_e: number | null;
}

interface Props {
    objectMetric: ObjectMetric;
}

export default function Edit({ objectMetric }: Props) {
    const { data, setData, put, processing, errors } = useForm<ObjectMetricForm>({
        name: objectMetric.name,

        // Level 2 Criteria Group 1
        l2_cg1_a: objectMetric.l2_cg1_a?.toString() || '0',
        l2_cg1_b: objectMetric.l2_cg1_b?.toString() || '0',
        l2_cg1_c: objectMetric.l2_cg1_c?.toString() || '0',
        l2_cg1_d: objectMetric.l2_cg1_d?.toString() || '0',
        l2_cg1_e: objectMetric.l2_cg1_e?.toString() || '0',

        // Level 2 Criteria Group 2
        l2_cg2_a: objectMetric.l2_cg2_a?.toString() || '0',
        l2_cg2_b: objectMetric.l2_cg2_b?.toString() || '0',
        l2_cg2_c: objectMetric.l2_cg2_c?.toString() || '0',
        l2_cg2_d: objectMetric.l2_cg2_d?.toString() || '0',

        // Level 2 Criteria Group 3
        l2_cg3_a: objectMetric.l2_cg3_a?.toString() || '0',
        l2_cg3_b: objectMetric.l2_cg3_b?.toString() || '0',
        l2_cg3_c: objectMetric.l2_cg3_c?.toString() || '0',
        l2_cg3_d: objectMetric.l2_cg3_d?.toString() || '0',
        l2_cg3_e: objectMetric.l2_cg3_e?.toString() || '0',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.object-metrics.update', objectMetric.id));
    };

    const handleInputChange = (field: string, value: string) => {
        // Validate decimal input
        if (value === '') {
            setData(field, '0');
            return;
        }

        // Check if value is a valid decimal with max 9 digits before decimal and 4 after
        const decimalRegex = /^\d{1,9}(\.\d{1,4})?$/;
        if (decimalRegex.test(value)) {
            const numValue = parseFloat(value);
            if (numValue >= 0 && numValue <= 999999999.9999) {
                setData(field, value);
            }
        } else if (value === '0' || value === '0.') {
            setData(field, value);
        }
    };

    return (
        <AdminLayout title="Edit Metrik" description="Edit metrik penilaian">
            <Head title="Edit Metrik" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('admin.object-metrics.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Edit Metrik</h2>
                        <p className="text-muted-foreground">Edit metrik penilaian untuk aplikasi</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Aplikasi *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama aplikasi"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Level 2 Criteria Group 1 - App Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Level 2 Criteria Group 1 - App Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                {[
                                    { field: 'l2_cg1_a', label: 'Ukuran File' },
                                    { field: 'l2_cg1_b', label: 'Total Rating' },
                                    { field: 'l2_cg1_c', label: 'User Rated' },
                                    { field: 'l2_cg1_d', label: 'Total Install' },
                                    { field: 'l2_cg1_e', label: 'Release Date' },
                                ].map(({ field, label }) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field}>{label}</Label>
                                        <Input
                                            id={field}
                                            type="text"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0.0000"
                                            pattern="^\d{1,9}(\.\d{1,4})?$"
                                            title="Masukkan angka dengan maksimal 9 digit sebelum koma dan 4 digit setelah koma (contoh: 123456789.1234)"
                                            className={errors[field as keyof ObjectMetricForm] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof ObjectMetricForm] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof ObjectMetricForm]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Level 2 Criteria Group 2 - Financial Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Level 2 Criteria Group 2 - Financial Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                {[
                                    { field: 'l2_cg2_a', label: 'Giro' },
                                    { field: 'l2_cg2_b', label: 'Tabungan' },
                                    { field: 'l2_cg2_c', label: 'Deposito' },
                                    { field: 'l2_cg2_d', label: 'Laba Bersih' },
                                ].map(({ field, label }) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field}>{label}</Label>
                                        <Input
                                            id={field}
                                            type="text"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0.0000"
                                            pattern="^\d{1,9}(\.\d{1,4})?$"
                                            title="Masukkan angka dengan maksimal 9 digit sebelum koma dan 4 digit setelah koma (contoh: 123456789.1234)"
                                            className={errors[field as keyof ObjectMetricForm] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof ObjectMetricForm] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof ObjectMetricForm]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Level 2 Criteria Group 3 - User Experience Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Level 2 Criteria Group 3 - User Experience Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                {[
                                    { field: 'l2_cg3_a', label: 'Happiness' },
                                    { field: 'l2_cg3_b', label: 'Engagement' },
                                    { field: 'l2_cg3_c', label: 'Adoption' },
                                    { field: 'l2_cg3_d', label: 'Retention' },
                                    { field: 'l2_cg3_e', label: 'Task Success' },
                                ].map(({ field, label }) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field}>{label}</Label>
                                        <Input
                                            id={field}
                                            type="text"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0.0000"
                                            pattern="^\d{1,9}(\.\d{1,4})?$"
                                            title="Masukkan angka dengan maksimal 9 digit sebelum koma dan 4 digit setelah koma (contoh: 123456789.1234)"
                                            className={errors[field as keyof ObjectMetricForm] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof ObjectMetricForm] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof ObjectMetricForm]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('admin.object-metrics.index')}>
                            <Button variant="outline" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
