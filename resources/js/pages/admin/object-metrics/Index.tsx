import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
    objectMetrics: {
        data: ObjectMetric[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ objectMetrics, filters }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null);
    const [deletingIds, setDeletingIds] = useState<number[]>([]);

    // Cleanup function to reset deleting state if something goes wrong
    const resetDeletingState = (id?: number) => {
        if (id) {
            setDeletingIds((prev) => prev.filter((item) => item !== id));
        } else {
            setDeletingIds([]);
        }
    };

    // Safety timeout to reset deleting state if something goes wrong
    useEffect(() => {
        if (deletingIds.length > 0) {
            const timeout = setTimeout(() => {
                console.warn('Deleting state timeout, resetting...');
                setDeletingIds([]);
            }, 10000); // 10 seconds timeout

            return () => clearTimeout(timeout);
        }
    }, [deletingIds]);

    const { data, setData, post, processing, errors } = useForm({
        search: filters.search || '',
        csv_file: null as File | null,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.object-metrics.index'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(objectMetrics.data.map((metric) => metric.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectItem = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((item) => item !== id));
        }
    };

    const handleMultipleDelete = () => {
        if (selectedIds.length === 0) return;

        setDeletingIds(selectedIds);
        router.delete(
            route('admin.object-metrics.destroy-multiple'),
            {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setSelectedIds([]);
                    setDeletingIds([]);
                    // Use visit instead of reload to avoid infinite loop
                    router.visit(route('admin.object-metrics.index'), {
                        preserveScroll: true,
                        preserveState: false,
                    });
                },
                onError: (errors) => {
                    setDeletingIds([]);
                    console.error('Multiple delete failed:', errors);
                },
            },
            {
                preserveScroll: true,
            },
        );
    };

    const handleExport = () => {
        router.get(route('admin.object-metrics.export'), data, {
            preserveState: true,
        });
    };

    const handleImport = () => {
        if (!data.csv_file) return;

        const formData = new FormData();
        formData.append('csv_file', data.csv_file);

        post(route('admin.object-metrics.import'), {
            data: formData,
            onSuccess: () => {
                setImportDialogOpen(false);
                setData('csv_file', null);
                // Use visit instead of reload to avoid infinite loop
                router.visit(route('admin.object-metrics.index'), {
                    preserveScroll: true,
                    preserveState: false,
                });
            },
            onError: (errors) => {
                console.error('Import failed:', errors);
            },
        });
    };

    const isDeleting = deletingIds.length > 0;

    return (
        <AdminLayout title="Metrik Penilaian" description="Kelola data metrik penilaian aplikasi">
            <Head title="Metrik Penilaian" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Metrik Penilaian</h2>
                        <p className="text-muted-foreground">Kelola data metrik penilaian aplikasi</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" disabled={isDeleting}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Import Data Metrik</DialogTitle>
                                    <DialogDescription>
                                        Upload file CSV untuk mengimpor data metrik. Pastikan format sesuai dengan
                                        template.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Input
                                        type="file"
                                        accept=".csv,.txt"
                                        onChange={(e) => setData('csv_file', e.target.files?.[0] || null)}
                                    />
                                    <div className="text-muted-foreground text-sm">
                                        <p>Format CSV yang diharapkan:</p>
                                        <p>
                                            ID, Nama, L2_CG1_A, L2_CG1_B, L2_CG1_C, L2_CG1_D, L2_CG1_E, L2_CG2_A,
                                            L2_CG2_B, L2_CG2_C, L2_CG2_D, L2_CG3_A, L2_CG3_B, L2_CG3_C, L2_CG3_D,
                                            L2_CG3_E
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button onClick={handleImport} disabled={processing || !data.csv_file}>
                                        {processing ? 'Mengimpor...' : 'Import'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Delete Confirmation Dialog */}
                        <Dialog open={deleteDialogOpen !== null} onOpenChange={() => setDeleteDialogOpen(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {deleteDialogOpen === -1 ? 'Hapus Metrik Terpilih' : 'Hapus Metrik'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {deleteDialogOpen === -1
                                            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} metrik yang dipilih? Tindakan ini tidak dapat dibatalkan.`
                                            : `Apakah Anda yakin ingin menghapus metrik "${objectMetrics.data.find((m) => m.id === deleteDialogOpen)?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                                        Batal
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            if (deleteDialogOpen === -1) {
                                                // Multiple delete
                                                console.log(
                                                    'Multiple delete dialog confirmed, route:',
                                                    route('admin.object-metrics.destroy-multiple'),
                                                );
                                                handleMultipleDelete();
                                                setDeleteDialogOpen(null);
                                            } else if (deleteDialogOpen) {
                                                // Single delete
                                                setDeletingIds((prev) => [...prev, deleteDialogOpen]);
                                                router.delete(route('admin.object-metrics.destroy', deleteDialogOpen), {
                                                    onSuccess: () => {
                                                        resetDeletingState(deleteDialogOpen);
                                                        setDeleteDialogOpen(null);
                                                        // Use visit instead of reload to avoid infinite loop
                                                        router.visit(route('admin.object-metrics.index'), {
                                                            preserveScroll: true,
                                                            preserveState: false,
                                                        });
                                                    },
                                                    onError: (errors) => {
                                                        resetDeletingState(deleteDialogOpen);
                                                        setDeleteDialogOpen(null);
                                                        console.error('Delete failed:', errors);
                                                    },
                                                });
                                            }
                                        }}
                                        disabled={
                                            deleteDialogOpen === -1
                                                ? deletingIds.length > 0
                                                : deletingIds.includes(deleteDialogOpen || 0)
                                        }
                                    >
                                        {deleteDialogOpen === -1
                                            ? deletingIds.length > 0
                                                ? 'Menghapus...'
                                                : 'Hapus'
                                            : deletingIds.includes(deleteDialogOpen || 0)
                                              ? 'Menghapus...'
                                              : 'Hapus'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={handleExport} variant="outline" size="sm" disabled={isDeleting}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>

                        <Link href={route('admin.object-metrics.create')}>
                            <Button size="sm" disabled={isDeleting}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Metrik
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search and Actions */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <form onSubmit={handleSearch} className="flex max-w-md flex-1 items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        placeholder="Cari nama aplikasi..."
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="pl-10"
                                        disabled={isDeleting}
                                    />
                                </div>
                                <Button type="submit" variant="outline" size="sm" disabled={isDeleting}>
                                    Cari
                                </Button>
                            </form>

                            {selectedIds.length > 0 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={deletingIds.length > 0}
                                    onClick={() => setDeleteDialogOpen(-1)} // -1 means multiple delete
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {deletingIds.length > 0 ? 'Menghapus...' : `Hapus ${selectedIds.length} Item`}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Metrik ({objectMetrics.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={
                                                    selectedIds.length === objectMetrics.data.length &&
                                                    objectMetrics.data.length > 0
                                                }
                                                onCheckedChange={handleSelectAll}
                                                disabled={isDeleting}
                                            />
                                        </TableHead>
                                        <TableHead>Nama Aplikasi</TableHead>
                                        <TableHead>Terakhir Diupdate</TableHead>
                                        <TableHead className="w-12">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {objectMetrics.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                                                Tidak ada data metrik
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        objectMetrics.data.map((metric) => (
                                            <TableRow key={metric.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedIds.includes(metric.id)}
                                                        onCheckedChange={(checked) =>
                                                            handleSelectItem(metric.id, checked as boolean)
                                                        }
                                                        disabled={isDeleting}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{metric.name}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {new Date(metric.updated_at).toLocaleDateString('id-ID')}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="relative">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="hover:bg-muted h-8 w-8 p-0"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="z-50 w-48"
                                                                sideOffset={4}
                                                            >
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route(
                                                                            'admin.object-metrics.show',
                                                                            metric.id,
                                                                        )}
                                                                        className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm"
                                                                    >
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        Lihat Detail
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route(
                                                                            'admin.object-metrics.edit',
                                                                            metric.id,
                                                                        )}
                                                                        className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm"
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {objectMetrics.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Menampilkan {(objectMetrics.current_page - 1) * objectMetrics.per_page + 1} sampai{' '}
                                    {Math.min(objectMetrics.current_page * objectMetrics.per_page, objectMetrics.total)}{' '}
                                    dari {objectMetrics.total} hasil
                                </div>
                                <div className="flex items-center gap-2">
                                    {objectMetrics.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.object-metrics.index'),
                                                    { ...filters, page: objectMetrics.current_page - 1 },
                                                    { preserveState: true },
                                                )
                                            }
                                            disabled={isDeleting}
                                        >
                                            Sebelumnya
                                        </Button>
                                    )}
                                    {objectMetrics.current_page < objectMetrics.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    route('admin.object-metrics.index'),
                                                    { ...filters, page: objectMetrics.current_page + 1 },
                                                    { preserveState: true },
                                                )
                                            }
                                            disabled={isDeleting}
                                        >
                                            Selanjutnya
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
