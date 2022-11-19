import { PaginationInfo } from 'naive-ui';
import { VNodeChild } from 'vue';
export interface PaginationProps {
  page?: number;
  itemCount?: number;
  pageCount?: number;
  pageSize?: number;
  pageSizes?: number[];
  pageSlot?: number;
  showSizePicker?: boolean;
  showQuickJumper?: boolean;
  size?: string;
  displayOrder?: string[];
  prefix?: (info: PaginationInfo) => VNodeChild
}
