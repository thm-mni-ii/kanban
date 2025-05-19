<template>
  <div class="base-card">
    <header v-if="$slots.header">
      <slot name="header"> 
      </slot>
    </header>
    <slot></slot>
  </div>
  <footer v-if="$slots.footer">
    <slot name="footer"></slot>
  </footer>
</template>

<style scoped>
.base-card {
  display: block;
  width: 100%;
  max-width: 50rem;
  box-sizing: border-box;
  padding: 10px;
  margin: 2rem auto;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  background-color: #fff ;

}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
footer {
  margin-top: 1rem;
  text-align: center;
}
</style>