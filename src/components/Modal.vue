<template>
    <!-- Modal -->
    <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" @click="onClose">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(_, {emit}) {
        const onClose = () => {
            emit('close');
        };

        return {
            onClose
        }
    }
}
</script>

<style scoped>
.modal-wrapper {
    position: fixed;
    z-index: 100;
    inset: 0 0 0 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

</style>