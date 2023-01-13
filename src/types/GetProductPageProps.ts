import { ProductData } from "./ProductData";

export type GetProductPageProps = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: ProductData[]
}