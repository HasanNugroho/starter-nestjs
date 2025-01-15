export class Pagination {
    totalCount: number;   // Total number of matching rows
    currentPage: number;
    totalPages: number;
}

export class ListResponse {
    message: string;
    pagination: Pagination;
    data: any[];
}

export function generatePagination(totalCount, page, limit): Pagination {
    return {
        totalCount,   // Total number of matching rows
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
    }
}