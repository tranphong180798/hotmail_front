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
              Tên :
            </div>
          </template>
        </v-text-field>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.price"
        >
          <template v-slot:label >
            <div class="label-text">
              Gía cả :
            </div>
          </template>
        </v-text-field>

        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.amount"
        >
          <template v-slot:label >
            <div class="label-text">
              Tồn kho :
            </div>
          </template>
        </v-text-field>
        <template>
        <v-combobox
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="this.category"
          :items="this.listCategory"
        >
          <template v-slot:label >
            <div class="label-text">
              Category
            </div>
          </template>
        </v-combobox>
        </template>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.country"
        >
          <template v-slot:label >
            <div class="label-text">
              Nước :
            </div>
          </template>
        </v-text-field>

        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.description"
        >
          <template v-slot:label >
            <div class="label-text">
              Mô tả :
            </div>
          </template>
        </v-text-field>

        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.price"
        >
          <template v-slot:label >
            <div class="label-text">
              Gía cả :
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
import screenUrl from '../../../../../scripts/common/url/screenurl_admin_account'
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
          price : null,
          amount : null,
          country : null,
          categoryType : {
            name : null
          },
          description : null,

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
      search : '',
      category : [],
      listCategory : [],
    }
  },
  created(){
    this.setCategory();
  },
  methods: {
    async setCategory(){
      this.category = this.item.categoryType.name;
      let listCate = [];
      await axios.get("http://localhost:8080/api/category").then((res) => {
        if (res.data.isSuccess) {
          listCate = res.data.data;
        } else {
          listCate = [];
        }
      }).catch((error) => {
        console.log(error);
      });
      console.log(listCate);
      let lists =[];
      listCate.forEach(function(ele){
        lists.push(ele.name);
      })
      console.log(lists)
      this.listCategory = lists;
      console.log(this.listCategory)
    },
    async onBack() {

      // 一覧画面に戻ります
      this.$customRouter.push(screenUrl.ACCOUNT_LIST, null, this.prev)
    },
    async save(item) {
      await axios.put("http://localhost:8080/api/account/"+item.id, {
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
          await this.$refs.informationDialog.open('THÔNG BÁO','Cập nhật thành công');
        }

      }).catch((error) => {
      });
    },
    async newCategory() {
      await axios.post("http://localhost:8080/api/account/", {
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
          this.$customRouter.push(screenUrl.ACCOUNT_DETAIL, query, params);
        }
      }).catch((error) => {
      });
    },
   async chooseItem(item) {
      console.log(item);
    }
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
