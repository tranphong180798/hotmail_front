/**
 * 共通 Component のインポート用JS
 *
 * ほとんどの画面で利用するコンポーネントを定義してください
 * - Layoutでのみ利用するコンポーネントは追加しないでください
 */

import Vue from 'vue'

//------------------------------------------------------
// components/pw/common
//------------------------------------------------------
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog'
import InformationDialog from '../components/common/InformationDialog'

Vue.mixin({
  components: {
    DeleteConfirmDialog,
    InformationDialog
  }
})
