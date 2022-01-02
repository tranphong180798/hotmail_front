<template>
<v-container>
  <v-card>
    <v-card-title>{{actionMode}}</v-card-title>
    <v-card-text>
      <v-text-field
        :readonly="actionMode===constants.OPERATION_MODE_VIEW"
        v-model="item.name"
      >
        <template v-slot:label >
          <div class="label-text">
            Tên
          </div>
        </template>
      </v-text-field>
      <v-text-field
        :readonly="actionMode===constants.OPERATION_MODE_VIEW"
        v-model="item.image"
      >
        <template v-slot:label >
          <div class="label-text">
            Image
          </div>
        </template>
      </v-text-field>
    </v-card-text>

    <v-card-actions style="display: flex;justify-content: center;">
      <v-btn color="primary" style="margin-right:200px" v-if="actionMode===constants.OPERATION_MODE_NEW" @click="newCategory()">Tạo mới</v-btn>
      <v-btn color="primary" style="margin-right:200px" v-if="actionMode===constants.OPERATION_MODE_EDIT" @click="save(item)">Lưu chỉnh sửa</v-btn>
      <v-btn color="info" @click="onBack()">Quay lại</v-btn>
    </v-card-actions>
  </v-card>
  <InformationDialog ref="informationDialog"/>
</v-container>
</template>

<script>
import axios from "axios";
import commonConstants from '../../../../../scripts/common/commonConstants';
import screenUrl from '../../../../../scripts/common/url/screenurl_admin_category'
export default {
  name: "_id",
  layout : "layout1",
  async asyncData({context, app, route, query, error}) {
    let params = null;

    if(route.params.mode === 'new')
    {
      params = {
        actionMode: route.params.mode,
        item : {
          name : null,
          image : null,
        }
      }

    } else {
       params = {
        actionMode: route.params.mode,
        item: route.params.item,
        id: query.id,
      }
    }

    // // ----------------------------------------------
    // // 初期情報取得
    // // ----------------------------------------------
    // let dataObj = await pointMeasureApi.getDetailData(app, params)



    return {
      actionMode: params.actionMode,
      id: params.id,
      item : params.item,
      prev: {
        backup: route.params.backup,
      },
    }
  },
  data(){
    return {
      constants: {
        OPERATION_MODE_VIEW: commonConstants.OPERATION_MODE_VIEW,
        OPERATION_MODE_NEW: commonConstants.OPERATION_MODE_NEW,
        OPERATION_MODE_EDIT: commonConstants.OPERATION_MODE_EDIT,
      },
    }
  },
  methods: {
    async onBack() {

      // 一覧画面に戻ります
      this.$customRouter.push(screenUrl.CATEGORY_LIST, null, this.prev)
    },
    async save(item) {
      await axios.put("http://localhost:8080/api/category/"+item.id, {
        "name": item.name,
        "image":item.image,
      },{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json,text/plain,*/*',
          'Authorization': this.$auth.strategy.token.get(),
        }
      }).then( async(res) => {
        if(res.data.isSuccess)
        {
          console.log(res);
          await this.$refs.informationDialog.open('THÔNG BÁO','Cập nhật thành công');
        }

      }).catch((error) => {
      });
    },
    async newCategory() {
      await axios.post("http://localhost:8080/api/category/", {
        "name": this.item.name,
        "image":this.item.image,
      },{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json,text/plain,*/*',
          'Authorization': this.$auth.strategy.token.get(),
        }
      }).then( async(res) => {
        if(res.data.isSuccess)
        {
          const data = res.data.data;
          console.log(data);
          await this.$refs.informationDialog.open('THÔNG BÁO','Tạo thành công');
          let query = {
            id: res.data.data.id,
          }
          let params = {
            mode: this.constants.OPERATION_MODE_EDIT,
            item : res.data.data,
            backup: {
              searchCondition: null,
              // paginationInfo: this.data.paginationInfo,
            }
          }
          this.$customRouter.push(screenUrl.CATEGORY_DETAIL, query, params);
        }
      }).catch((error) => {
      });
    },
  }
}
</script>

<style scoped>
.label-text{
  font-size: 20px;
  color:red;
  font-family:sans-serif;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
