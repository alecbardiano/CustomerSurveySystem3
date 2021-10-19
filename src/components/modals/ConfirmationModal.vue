

<template>
    <div>
        
    </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from "vue";

export default defineComponent({
    props: {
        confirmQuestion: String,
        confirmFlag: Boolean
    },
    setup(props) {
        const confirmFlagModel = computed({
        get: () => {
            if (props.confirmFlag) {
            return props.confirmFlag;
            } else {
            return false
            }
        },
        set: (value) => {
            if (value){
                emit("update:confirmFlag", {
                ...props.confirmFlag,
                value: true
                });
            }else{
                return null
            }
        },
        });

    

    onMounted( () => {
        console.log("mounted")
        console.log(props)
    })

    return{
        confirmFlagModel
        
    }

        
    },
})
</script>

<style lang="scss" scoped>
 p {
  font-family: arial, sans-serif;
  font-size: 18px;
}
</style>
