import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { ObjectMetricForm } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<ObjectMetricForm>({
        name: '',

        // Level 2 Criteria Group 1
        l2_cg1_a: '0',
        l2_cg1_b: '0',
        l2_cg1_c: '0',
        l2_cg1_d: '0',
        l2_cg1_e: '0',

        // Level 2 Criteria Group 2
        l2_cg2_a: '0',
        l2_cg2_b: '0',
        l2_cg2_c: '0',
        l2_cg2_d: '0',

        // Level 2 Criteria Group 3
        l2_cg3_a: '0',
        l2_cg3_b: '0',
        l2_cg3_c: '0',
        l2_cg3_d: '0',
        l2_cg3_e: '0',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.object-metrics.store'));
    };

    const handleInputChange = (field: string, value: string) => {
        setData(field, value === '' ? '0' : value);
    };

    return (
        <AdminLayout title="Tambah Metrik" description="Buat metrik penilaian baru">
            <Head title="Tambah Metrik" />

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
                        <h2 className="text-2xl font-bold tracking-tight">Tambah Metrik</h2>
                        <p className="text-muted-foreground">Buat metrik penilaian baru untuk aplikasi</p>
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
                                            type="number"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className={errors[field as keyof typeof errors] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof typeof errors] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof typeof errors]}
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
                                            type="number"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className={errors[field as keyof typeof errors] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof typeof errors] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof typeof errors]}
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
                                            type="number"
                                            value={data[field as keyof ObjectMetricForm] || ''}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className={errors[field as keyof typeof errors] ? 'border-red-500' : ''}
                                        />
                                        {errors[field as keyof typeof errors] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field as keyof typeof errors]}
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
                            {processing ? 'Menyimpan...' : 'Simpan Metrik'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
