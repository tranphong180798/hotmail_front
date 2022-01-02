<template>
  <div>
    <v-dialog v-model="isDisplay"
              width="500"
              @click:outside="onClickOutside"
    >
      <v-card>
        <v-card-title class="headline c-dialog-card-header c-dialog-card-header-orange">
          {{ title }}
        </v-card-title>

        <v-card-text class="py-3 px-3" v-html="message"></v-card-text>

        <v-divider></v-divider>

        <div class="py-2">
          <div class="text-center">
            <v-btn color="tertiary" @click.native="onNo" ref="buttonNo">No</v-btn>
            <v-btn color="strike" @click.native="onYes">Yes</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  name: 'DeleteConfirmDialog',

  //======================================================
  // data() / データ定義
  //======================================================
  data() {
    return {
      isDisplay: false,

      title: "bạn có muốn xóa không",
      message: null
    }
  },

  //======================================================
  // methods / メソッド
  //======================================================
  methods: {
    /**
     * モーダル表示
     * @param {*} title
     * @param {*} message
     */
    open(title=null, message=null) {

      this.isDisplay = true

      this.title = 'Xóa'

      this.message = "Bạn có muốn xóa không";

      // Set default button
      setTimeout(() => {
        this.$refs.buttonNo.$el.focus();
      }, 200)

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    /**
     * 「はい」ボタン押下
     */
    onYes() {
      this.resolve(true)
      this.isDisplay = false
    },

    /**
     * 「いいえ」ボタン押下
     */
    onNo() {
      this.resolve(false)
      this.isDisplay = false
    },

    /**
     * モーダルの外側をクリックした
     *
     * - 「いいえ」ボタン押下と同様の処理とする
     */
    onClickOutside() {
      this.resolve(false)
      this.isDisplay = false
    }
  }
}
</script>
