import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, FileText } from 'lucide-react';

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

    created_at: string;
    updated_at: string;
}

interface Props {
    objectMetric: ObjectMetric;
}

export default function Show({ objectMetric }: Props) {
    const formatValue = (value: number | null) => {
        if (value === null) return '-';
        return value.toString();
    };

    return (
        <AdminLayout title={objectMetric.name} description="Detail metrik penilaian">
            <Head title={objectMetric.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.object-metrics.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{objectMetric.name}</h2>
                            <p className="text-muted-foreground">Detail metrik penilaian aplikasi</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.object-metrics.edit', objectMetric.id)}>
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
                                <h4 className="text-muted-foreground text-sm font-medium">Nama Aplikasi</h4>
                                <p className="text-lg">{objectMetric.name}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Level 2 Criteria Group 1 - App Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Level 2 Criteria Group 1 - App Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            {[
                                { key: 'l2_cg1_a', label: 'Ukuran File' },
                                { key: 'l2_cg1_b', label: 'Total Rating' },
                                { key: 'l2_cg1_c', label: 'User Rated' },
                                { key: 'l2_cg1_d', label: 'Total Install' },
                                { key: 'l2_cg1_e', label: 'Release Date' },
                            ].map(({ key, label }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(objectMetric[key as keyof ObjectMetric] as number)}
                                        </span>
                                    </div>
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
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {[
                                { key: 'l2_cg2_a', label: 'Giro' },
                                { key: 'l2_cg2_b', label: 'Tabungan' },
                                { key: 'l2_cg2_c', label: 'Deposito' },
                                { key: 'l2_cg2_d', label: 'Laba Bersih' },
                            ].map(({ key, label }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(objectMetric[key as keyof ObjectMetric] as number)}
                                        </span>
                                    </div>
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
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            {[
                                { key: 'l2_cg3_a', label: 'Happiness' },
                                { key: 'l2_cg3_b', label: 'Engagement' },
                                { key: 'l2_cg3_c', label: 'Adoption' },
                                { key: 'l2_cg3_d', label: 'Retention' },
                                { key: 'l2_cg3_e', label: 'Task Success' },
                            ].map(({ key, label }) => (
                                <div key={key} className="space-y-2">
                                    <h4 className="text-muted-foreground text-sm font-medium">{label}</h4>
                                    <div className="flex items-center">
                                        <span className="font-mono text-lg">
                                            {formatValue(objectMetric[key as keyof ObjectMetric] as number)}
                                        </span>
                                    </div>
                                </div>
                            ))}
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
                                <p className="text-sm">{new Date(objectMetric.created_at).toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                                <h4 className="text-muted-foreground text-sm font-medium">Terakhir Diperbarui</h4>
                                <p className="text-sm">{new Date(objectMetric.updated_at).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
