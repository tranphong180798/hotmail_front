<template>
  <div>
    <v-dialog
      v-model="isDisplay"
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
            <v-btn color="tertiary" @click.native="onClose" ref="buttonClose">Đóng</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'InformationMessage',

  //======================================================
  // data() / データ定義
  //======================================================
  data() {
    return {
      isDisplay: false,

      title: null,
      message: null,
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
    open(title, message) {

      this.isDisplay = true;
      this.title = title;
      this.message = message;

      // Set default button
      setTimeout(() => {
          this.$refs.buttonClose.$el.focus();
      }, 200)

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    /**
     * 閉じるボタン押下
     */
    onClose() {
      this.resolve(true)
      this.isDisplay = false
    },

    /**
     * モーダルの外側をクリックした
     *
     * - 「いいえ」ボタン押下と同様の処理とする
     */
    onClickOutside() {
      this.resolve(true)
      this.isDisplay = false
    }
  }
}
</script>
