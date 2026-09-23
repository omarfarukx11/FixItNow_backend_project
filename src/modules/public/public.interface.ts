export interface QueryInterface {
  searchTerm?: string;

  min_experience?: number;
  max_experience?: number;

  min_rate?: number;
  max_rate?: number;

  min_rating?: number;

  location?: string;

  min_reviews?: number;

  sortBy?: string;
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;
}
