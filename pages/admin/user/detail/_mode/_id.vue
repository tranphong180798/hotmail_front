<template>
  <v-container>
    <v-card>
      <v-card-title>{{actionMode}}</v-card-title>
      <v-card-text>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.username"
        >
          <template v-slot:label >
            <div class="label-text">
              Tên tài khoản
            </div>
          </template>
        </v-text-field>
        <v-text-field
          v-if="actionMode!==constants.OPERATION_MODE_VIEW"
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.password"
          type="password"
        >
          <template v-slot:label >
            <div class="label-text">
              Mật khẩu
            </div>
          </template>
        </v-text-field>
        <h2 style="font-size:17px;color:red;font-weight:bold">Vai trò</h2>
        <div >
          <v-radio-group
            :disabled="actionMode===constants.OPERATION_MODE_VIEW"
            v-model="radiosRole"
            mandatory
          >
            <v-radio
              color="green"
              label="Admin"
              value="admin"
            ></v-radio>
            <v-radio
              color="red"
              label="Client"
              value="client"
            ></v-radio>
          </v-radio-group>
        </div>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.balance"
        >
          <template v-slot:label >
            <div class="label-text">
              Số dư
            </div>
          </template>
        </v-text-field>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.createdAt"
        >
          <template v-slot:label >
            <div class="label-text">
              Ngày tạo
            </div>
          </template>
        </v-text-field>
        <v-text-field
          :readonly="actionMode===constants.OPERATION_MODE_VIEW"
          v-model="item.updatedAt"
        >
          <template v-slot:label >
            <div class="label-text">
              Ngày cập nhật
            </div>
          </template>
        </v-text-field>
      </v-card-text>

      <v-card-actions style="display: flex;justify-content: center;">
        <v-btn color="primary" style="margin-right:200px" v-if="actionMode===constants.OPERATION_MODE_NEW" @click="newUser()">Tạo mới</v-btn>
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
import screenUrl from '../../../../../scripts/common/url/screenurl_admin_user'
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
          username : null,
          password : null,
          role : null,
          balance : null,
          createdAt : null,
          updatedAt : null,
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
      radiosRole :  params.item.role,
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
      radios : 'client'
    }
  },
  methods: {
    async onBack() {

      // 一覧画面に戻ります
      this.$customRouter.push(screenUrl.USER_LIST, null, this.prev)
    },
    async save(item) {

      await axios.put("http://localhost:8080/api/user/"+item.id, {
        "username": item.username,
        "password": item.password,
        "role" : this.radiosRole,
        "balance" : item.balance,
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
    async newUser() {
      await axios.post("http://localhost:8080/api/user/", {
        "username": this.item.username,
        "password": this.item.password,
        "role" : this.radiosRole,
        "balance" : this.item.balance,
      },{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json,text/plain,*/*',
          'Authorization': this.$auth.strategy.token.get(),
        }
      }).then( async(res) => {
        if(res.data.isSuccess)
        {
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
          this.$customRouter.push(screenUrl.USER_DETAIL, query, params);
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
