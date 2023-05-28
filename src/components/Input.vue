<template>
    <div class="form-group">
        <label>{{title}}</label>
        <input type="text" class="form-control" :value="subject" @input="updateSubject"/>
        <div v-if="subjectError" class="text-red">
            {{ error }}
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
    props : {
        title: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        }
    },
    setup() {
        const {emit} = getCurrentInstance();
        
        const updateSubject = (event) => {
            emit('update:subject', event.target.value);
        }

        return {
            updateSubject
        }
    },
}
</script>

<style scoped>
.text-red {
    color: red;
  }
</style>