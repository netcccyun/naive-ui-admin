import type { PaginationProps } from '../types/pagination';
import type { BasicTableProps } from '../types/table';
import { computed, unref, ref, ComputedRef, h } from 'vue';
import { screenEnum } from '@/enums/breakpointEnum';

import { isBoolean } from '@/utils/is';
import { APISETTING, DEFAULTPAGESIZE, PAGESIZES, PAGESLOT, DISPLAYORDER } from '../const';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }
    const { totalField } = APISETTING;
    const total = unref(configRef)[totalField] ?? 0;
    const pageSize = unref(configRef).pageSize ?? DEFAULTPAGESIZE;
    let pageCount = parseInt(total / pageSize);
    if(total % pageSize > 0){
      pageCount ++;
    }
    let pageSlot = PAGESLOT;
    if(document.body.clientWidth <= screenEnum.SM){
      pageSlot = 5;
    }
    return {
      pageSize: pageSize,
      pageSizes: PAGESIZES,
      pageSlot: pageSlot,
      showSizePicker: true,
      showQuickJumper: true,
      size: 'large',
      displayOrder: DISPLAYORDER,
      prefix: ({itemCount, startIndex, endIndex})=>h('span', null, ['第 '+(startIndex+1)+'-'+(endIndex+1)+' 条, 共 ', h('b', null, itemCount), ' 条']),
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
      itemCount: total,
      pageCount: pageCount,
    };
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
