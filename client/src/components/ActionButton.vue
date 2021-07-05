<template>
  <div
    class="
      relative
      rounded-lg
      border border-gray-300
      bg-white
      px-6
      py-5
      shadow-sm
      flex
      items-center
      space-x-3
      hover:border-gray-400
      focus-within:ring-2
      focus-within:ring-offset-2
      focus-within:ring-indigo-500
    "
  >
    <div class="flex-1 min-w-0 cursor-pointer">
      <a class="focus:outline-none" v-bind="$attrs" v-on="$listeners">
        <h4 class="text-xl font-medium">
          <slot></slot>
        </h4>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>