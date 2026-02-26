import { ColumnDef } from '@tanstack/react-table';
import { Movie } from '@/entities/movie/model/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const movieTableColumns: ColumnDef<Movie>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'releaseDate',
    header: 'Ano',
    cell: ({ row }) => {
      const date = row.getValue('releaseDate') as string;
      return <div>{new Date(date).getFullYear()}</div>;
    },
  },
  {
    accessorKey: 'genres',
    header: 'Gêneros',
    cell: ({ row }) => {
      const genres = row.getValue('genres') as string[];
      return (
        <div className="flex gap-1 flex-wrap">
          {genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Avaliação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      return <div>{rating.toFixed(1)}</div>;
    },
  },
];