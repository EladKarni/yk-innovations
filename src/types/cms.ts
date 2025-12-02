// CMS-related types for Payload data

export interface PageHeader {
  label?: string;
  title?: string;
  description?: string;
}

export interface ProjectsSectionData {
  title?: string;
  pageHeader?: PageHeader;
}

export interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}
