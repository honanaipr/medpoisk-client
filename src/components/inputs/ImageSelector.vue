<script setup lang="ts">
import defaultImage from '@/assets/add_image.png'
import { ref } from 'vue'

defineProps({
  imageUrl: {type: String, required: false}
})

const imageFile = defineModel<File | null>('imageFile', { required: false })
const iamgeSrc = ref<string>(defaultImage)
const imgInputRef = ref<HTMLInputElement | null>(null)

function onfileChange() {
  if (!imgInputRef.value || !imgInputRef.value.files) return
  const file = imgInputRef.value.files[0]
  imageFile.value = file
  if (file) {
    iamgeSrc.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="image-selector">
    <label class="input-label" for="imageFileInput"><img :src="iamgeSrc" class="preview" /></label>
    <input
      v-bind="$attrs"
      type="file"
      ref="imgInputRef"
      @change="onfileChange"
      id="imageFileInput"
      class="imageFileInput"
      accept="image/*"
    />
  </div>
</template>

<style scoped lang="sass">
.imageFileInput
  display: none

label.input-label
  cursor: pointer

img.preview
  border-radius: 0.5rem
  width: 100px
  aspect-ratio: 1

div.image-selector
  display: flex
  justify-content: center

.uploadFile
  display: none

#uploadIcon
  cursor: pointer

svg
  width: 20px

</style>
