<template>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a v-for="i in pages.total_pages" :key="i"
           :class="{ active: pages.curent_page ===i }" class="page-link" href="#"
           @click.prevent="updatePage(i)"> {{ i }}</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(num) {
      // 觸發外部事件
      this.$emit('update', num);
    },
  },
};
</script>
