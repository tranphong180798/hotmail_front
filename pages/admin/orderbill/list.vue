<template>
  <v-card>
    <v-card-title>
      <v-breadcrumbs
        :items="items"
        divider="/"
      ></v-breadcrumbs>
    </v-card-title>
    <v-toolbar flat>
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title>
        List OrderBill
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="newCategory('new')">
        <v-icon> mdi-account-multiple-plus</v-icon>
        Create
      </v-btn>

      <v-btn>
        <v-icon> mdi-arrow-down-bold-circle-outline</v-icon>
        Export
      </v-btn>
    </v-toolbar>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="itemss"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Search"
      solo-inverted
    ></v-autocomplete>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-data-table
          style="background-color: #dbdee0"
          table
          table-hover
          table-striped
          table-bordered
          :headers="headers"
          :items="listOrderBill"
          class="elevation-1 paddingForm my-border"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="blue" @click="showDetail(constants.OPERATION_MODE_VIEW,item)">Xem</v-btn>
            <v-btn color="primary" @click="showDetail(constants.OPERATION_MODE_EDIT,item)">Sửa</v-btn>
            <v-btn color="red" @click="onDelete(item)">Xóa</v-btn>
          </template>
        </v-data-table>
      </v-list>
    </v-card-text>
    <DeleteConfirmDialog ref="deleteConfirmDialog"/>
    <InformationDialog ref="informationDialog"/>
  </v-card>

</template>
<script>
import axios from "axios";
import axiosUrl from "../../../scripts/common/axios";
import commonConstants from '../../../scripts/common/commonConstants';
import screenUrl from '../../../scripts/common/url/screenurl_admin_orderbill'
export default {
  name: "index",
  props: ["resource", "title"],
  layout: 'layout1',
  asyncData() {
    return axios.get(axiosUrl.baseUrl+"/orderBill",).then((res) => {
      if (res.data.isSuccess) {
        return {listOrderBill: res.data.data,
        };
      } else {
        return {listOrderBill: []};
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  data() {
    return {
      headers: [
        {
          text: "Tài khoản",
          value: "accountOrdered.name",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Người dùng",
          value: "user.username",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Số lượng",
          value: "quantity",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Tổng tiền",
          value: "totalMoney",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Thao tác",
          value: "actions",
          class: "blue lighten-2",
          align: "center",
        }
      ],
      items: [
        {
          text: 'Admin',
          disabled: true,
        },
        {
          text: 'Order Bill',
          disabled: true,
        },
        {
          text: 'list',
          disabled: true,
        },

      ],
      header : {
        'Content-Type': 'application/json',
        'Accept': 'application/json,text/plain,*/*',
        'Authorization': this.$auth.strategy.token.get(), // refers to nuxt.config.js->auth.token
      },
      loading: false,
      itemss: [],
      search: null,
      select: null,
      constants: {
        OPERATION_MODE_VIEW: commonConstants.OPERATION_MODE_VIEW,
        OPERATION_MODE_NEW: commonConstants.OPERATION_MODE_NEW,
        OPERATION_MODE_EDIT: commonConstants.OPERATION_MODE_EDIT,
      },
    };
  },
  methods: {
    // load category
    async loadCategory(){
      return axios.get(axiosUrl.baseUrl+"/orderBill").then((res) => {
        if (res.data.isSuccess) {
          this.listOrderBill = res.data.data;
        } else {
          this.listOrderBill = [];
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    // delete category
    async onDelete(row) {
      // Note: バージョンチェックはonSelectOperation()で呼び出しています。

      //----------------------------------------------
      // 削除可能な場合
      //----------------------------------------------
      // 確認メッセージを表示
      let isYes = await this.$refs.deleteConfirmDialog.open();
      if (!isYes) {
        return;
      }
      await axios.delete(axiosUrl.baseUrl+"/orderBill/"+row.id,{
        headers : this.header
      }).then(async (res) => {
        console.log(res.data);
        if(res.data.isSuccess) {
          await this.$refs.informationDialog.open('THÔNG BÁO','Xóa thành công');
          await this.loadCategory();
        } else {
          await this.$refs.informationDialog.open('THÔNG BÁO','Id này đang được sử dụng');
        }

      }).catch((error) => {
        console.log(error);
      });

    },
    async showDetail(mode, item) {
      let path = screenUrl.ORDER_BILL_DETAIL;
      let query = {
        id: item.id,
      }
      let params = {
        mode: mode,
        item : item,
        backup: {
          searchCondition: this.select,
          // paginationInfo: this.data.paginationInfo,
        }
      }
      this.$customRouter.push(path, query, params)
    },
    async newCategory(mode) {
      let path = screenUrl.ORDER_BILL_DETAIL;

      let params = {
        mode: mode,
        item : null,
        backup: {
          searchCondition: this.select,
          // paginationInfo: this.data.paginationInfo,
        }
      }
      this.$customRouter.push(path, null, params)
    },
  }
}
</script>

<style scoped>

</style>
