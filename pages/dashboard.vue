<template>
  <v-container class="grey lighten-5">

      <v-alert type="error" :value="alert.type==='error'"transition="scale-transition"  >
        <div v-html="alert.message"></div>
      </v-alert>


    <div  class="p-mt-6">
      <v-alert :value="alert.type==='success'" type="success" transition="scale-transition">
        <div v-html="alert.message"></div>
      </v-alert>
    </div>
    <v-row
      no-gutters
    >
      <v-col md="3">

        <!--    register/login-->
        <v-row>
          <v-card class="login" style="width:88%">
            <v-card-title style="font-weight: bold;display: flex;justify-content: center">Thông tin User</v-card-title>
            <v-text-field
              readonly
              v-model="this.$store.state.auth.user.name"
              label="Xin chào"
            >
              <template v-slot:label>
                <div class="label-text">
                  Xin chào
                </div>
              </template>
            </v-text-field>
            <v-text-field
              readonly
              v-model="this.$store.state.auth.user.balance"
              label="Số dư"
            >
              <template v-slot:label>
                <div class="label-text">
                  Số dư:
                </div>
              </template>
            </v-text-field>
            <div style="text-align: center;">
              <v-btn depressed
                     color="error"
                     @click.prevent="logout()"
              >Đăng xuất
              </v-btn>
            </div>
          </v-card>
        </v-row>

        <!--    diveder area-->
        <v-divider style="margin-top:25px;"></v-divider>

        <!--    info customer-->
        <v-row style="margin-top:15px;">
          <v-card style="width:88%;">
            <v-card-title style="justify-content: center;font-weight: bold">NẠP TIỀN</v-card-title>
            <v-card-text>
              <v-tabs
                v-model="tab"
                background-color="white"
                dark
              >
                <v-tabs-slider color="black"></v-tabs-slider>
                <v-tab
                  v-for="item in items"
                  :key="item.tab"
                >
                  <img v-if="item.id===1" src="./../assets/img/logoVietcombank.png" style="width:70px;padding:0"/>
                  <img v-if="item.id===2" src="./../assets/img/logoMomo1.png"
                       style="width:70px;padding:0; border-radius:20px"/>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(item,index) in items"
                  :key="item.index"
                >
                  <v-card flat>
                    <v-card-text>
                      <v-text-field
                        readonly
                        v-model="item.stk"
                      >
                        <template v-slot:label>
                          <div class="label-text">
                            {{ item.label }}
                          </div>
                        </template>
                      </v-text-field>
                      <v-text-field
                        readonly
                        v-model="item.nameReceive"
                      >
                        <template v-slot:label>
                          <div class="label-text">
                            Người nhận
                          </div>
                        </template>
                      </v-text-field>
                      <v-text-field
                        readonly
                        v-model="item.content"
                      >
                        <template v-slot:label>
                          <div class="label-text">
                            Nội dung
                          </div>
                        </template>
                      </v-text-field>
                      <v-textarea
                        label="Phản hồi"
                        :value="item.feedback"
                        rows="6"
                      >
                        <template v-slot:label>
                          <div class="label-text">
                            Phản hồi
                          </div>
                        </template>
                      </v-textarea>
                      <v-card dark
                              padless>
                        <v-card-text style="display: flex;" flat
                                     tile
                                     class="indigo lighten-1 white--text text-center">
                          <v-btn
                            v-for="icon in icons"
                            :key="icon"
                            class="mx-4 white--text"
                            icon
                          >
                            <v-icon size="24px">
                              {{ icon }}
                            </v-icon>
                          </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-card-text>

                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-row>

        <!-- diveder area-->
        <v-divider style="margin-top:25px;"></v-divider>

        <!--    khuyen mai nap tien-->
        <v-row>
          <v-card style="margin-top:25px;width:88%">
            <v-card-title>KHUYẾN MÃI NẠP TIỀN</v-card-title>
            <v-card-text style="color:green;font-size:18px;font-weight:bold;">
              0K 30%
              <br/>
              500K: 50%
              <br/>
              2TR: 100%
              <br/>
              5TR: 125%
              <br/>
              10TR: 200%
              <p style="font-size:15px;color:red;margin-top:20px">*** Đặc biệt nạp >1TR sẽ được cộng thêm 10% vào tài
                khoản tại <a href="https://anycaptcha.com/">AnyCapcha</a></p>
            </v-card-text>
          </v-card>
        </v-row>


      </v-col>

      <v-col md="9">
        <v-row
          v-for="(itemCategory,index) in listCategory" :key="index"
        >
          <v-card
            class="pa-2 rounded distance"
            outlined
            tile
            style="width:100%"

          >
            <v-card-title class="header_h2">{{ index }}</v-card-title>

            <v-data-table
              style="background-color: #dbdee0"
              table
              table-hover
              table-striped
              table-bordered
              :headers="headers"
              :items="itemCategory"
              hide-default-footer
              class="elevation-1 paddingForm my-border"

            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  dark
                  @click="buyQuantity(item.price,item.id)"
                >
                  Mua
                </v-btn>


              </template>

            </v-data-table>
          </v-card>
        </v-row>
        <v-dialog
          v-model="dialogQuantity"
          width="500"
          v-if=""
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2 header_h2">
              Bạn muốn mua số lượng bao nhiêu
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="amount"
                type="number"
                hint="số lượng"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                @click="buyOrderBill()"
              >
                Mua hàng
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog3"
          max-width="700px"
        >
          <v-card>
            <v-card-title>
              {{transaction.type}}

            </v-card-title>
            <v-card-title class="text-h5 grey lighten-2 header_h2">
              {{transaction.info}}
            </v-card-title>
            <v-card-text>
              <v-textarea
                height="200px"
                readonly
                :value="stringArea"
                row="10"
                autofocus
                loading = 'green'
                style="white-space: pre-line;"
                success
              >

              </v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                dark
                @click="downloadFile(typeFile='txt')"
                v-if="!(this.transaction.type === 'Giao dịch')"
              >
                Tải .txt file
              </v-btn>
              <v-btn
                color="primary"
                dark
                @click="downloadFile(typeFile='json')"
                v-if="!(this.transaction.type === 'Giao dịch')"
              >
                Tải .json file
              </v-btn>
              <v-btn

                color="error"
                dark
                @click="closeDialog()"
              >
                Đóng lại
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
    <!--    diveder area-->
    <v-divider style="margin-top:25px;"></v-divider>
    <v-row >
      <v-card
        class="pa-2 rounded distance"
        outlined
        tile
        style="width:100%"

      >
        <v-card-title  style="" class="header_h2">GIAO DỊCH CỦA BẠN</v-card-title>

        <v-data-table
          style="background-color: #dbdee0"
          table
          table-hover
          table-striped
          table-bordered
          :headers="headerTransaction"
          :items="listTransactionUser"
          class="elevation-1 paddingForm my-border"

        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="#64FFDA" @click="watchTransaction(item.id)">Xem</v-btn>
            <v-btn color="#E53935" @click="deleteTransaction(item.id)">Xóa</v-btn>
            <!--            <v-btn color="primary" @click="this.dialog=true">Mua</v-btn>-->

          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

  </v-container>
</template>

<script>

import axios from "axios";
import axiosUrl from "../scripts/common/axios";
import Pusher from 'pusher-js';
export default {
  name: "dashboard",
  asyncData({$axios}) {
    return $axios.get(axiosUrl.baseUrl+"/category/getListByCondition").then((res) => {
      if (res.data.isSuccess) {
        return {listCategory: res.data.data};
      } else {
        return {listCategory: []};
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  
  data() {
    return {
      polling: null,
      name: '',
      password: '',
      transactionUsers: this.$store.state.auth.user !== null,
      linkFace: '<a>https://www.facebook.com/daiphong.tran.140/</a>',
      rules: [v => v.length <= 15 || 'Nhiều nhất là 15 chữ số'],
      wordsRules: [v => v.trim().split(' ').length <= 5 || 'Max 5 words'],
      headers: [
        {
          text: "Tài khoản",
          value: "name",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Mô tả",
          value: "description",
          class: "blue lighten-2",
          align: "center"
        },
        {
          text: "Giá",
          value: "price",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Tồn kho",
          value: "remain_store",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "",
          value: "actions",
          class: "blue lighten-2",
          align: "center",
        }
      ],
      headerTransaction: [
        {
          text: "Ngày ",
          value: "created_at",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Mô tả",
          value: "category_account.name",
          class: "blue lighten-2",
          align: "center"
        },
        {
          text: "Loại",
          value: "category_account.price",
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
          text: "",
          value: "actions",
          class: "blue lighten-2",
          align: "center",
        }
      ],
      listTransactionUser:[],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
      alertTimeOut:true,
      tab: null,
      items: [
        {
          id: 1,
          label: 'Số tài khoản',
          stk: 15983177,
          nameReceive: 'Trần Đỗ Đại Phong',
          content: "Your username",
          feedback: 'Nạp tiền qua VCB, nhập chính xác nội dung là tên tài khoản của bạn,hệ thống sẽ tự động cộng tiền sau 30s-1p (Nếu quá 5 phút tiền chưa vào tài khoản, vui lòng inbox '
        },
        {
          id: 2,
          label: 'Số điện thoại',
          stk: '0364720704',
          nameReceive: 'Trần Đỗ Đại Phong',
          content: "Your username",
          feedback: 'Nạp tiền qua MOMO, nhập chính xác nội dung là tên tài khoản của bạn,hệ thống sẽ tự động cộng tiền sau 3-5p (Nếu quá 5 phút tiền chưa vào tài khoản, vui lòng inbox '
        }
      ],
      dialogQuantity: false,
      flag: false,
      amount: 0,
      dialog3: false,
      price: null,
      listAccountEmail: [],
      stringArea: '',
      category_account_id: null,
      typeFile:null,
      alert: {
        type:null,
        message:null
      },
      transaction:{
        type: "Bạn đã mua thành công",
        info: 'Danh sách dữ liệu'
      },
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
    }
  },
  created(){
    //this.pollData();
    this.transactionUser();


},
  mounted(){
    Pusher.logToConsole = true;

    const pusher = new Pusher('8ec510681cb424353247', {
      cluster: 'ap1',
      encrypted: true,
      forceTLS: true
    });

    const channel = pusher.subscribe('account_mail');
    channel.bind('listen_event_when_data_mail_increase', async(data) => {
     await axios.get(axiosUrl.baseUrl+"/category/getListByCondition").then((res) => {
        if (res.data.isSuccess) {
          this.listCategory = res.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  },
  methods: {
    transactionUser: async function(){
      let id = this.$store.state.auth.user.id;
      await this.$axios.get(axiosUrl.baseUrl+"/orderBill/"+id).then((res) => {
            if(res.data.isSuccess) {
              this.listTransactionUser = res.data.data;
            }
        
      }).catch((error) => {
        console.log(error);
      });
    }
    ,
    async logout() {
      await this.$auth.logout();
      this.loading();
    },
    buyQuantity: function (price, category_account_id) {
      this.dialogQuantity = true;
      this.price = price
      this.category_account_id = category_account_id;
    },

    buyOrderBill: async function () {
      console.log(this.$auth.strategy.token.get());
      const totalMoney = this.amount * this.price;
      await this.$axios.post(axiosUrl.baseUrl+"/orderBill", {
        "user_id": this.$store.state.auth.user.id,
        "quantity": parseInt(this.amount),
        "totalMoney": totalMoney,
        "category_account_id": this.category_account_id
      }).then((res) => {
        console.log(res.data);
        if(res.data.isSuccess) {
          this.listAccountEmail = res.data.data;
          this.stringArea = this.convertTextArea();
          this.$store.state.auth.user.balance = this.$store.state.auth.user.balance - totalMoney;
          this.alert.type='success';
          this.alert.message='Bạn mua thành công';
          this.dialog3 = !this.dialog3
          this.dialogQuantity = false;
          this.transaction.type = 'Bạn đã mua thành công';
          this.transaction.info = 'Danh sách dữ liệu';
          this.transactionUser();
        }
        else {
          this.alert.type='error';
          this.alert.message=res.data.data;
          this.dialogQuantity = false;
        }
        setTimeout(() => {
          this.alert.type = null
        },5000)
      }).catch((error) => {
        console.log(error);
      });
    },
    convertTextArea: function () {
      let stringArea = '';
      this.listAccountEmail.forEach((ele) => {
        stringArea += ele.email + ' | ' + ele.password + " \n";
      })
      return stringArea;
    },
    downloadFile:async function(type){
      await this.$axios.post(axiosUrl.baseUrl+"/accountSale/createFile", {
        "accountSaleString":this.stringArea,
        "typeFile":type
      }).then( async(res) => {
        if(res.data.isSuccess) {

          let url=axiosUrl.baseUrl+`/accountSale/downloadFile?nameFile=${res.data.data}`;
          var element = document.createElement('a');
          element.setAttribute('href', url);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        }
        
      }).catch((error) => {
      });
    },
    pollData: function() {
       setInterval(() => {
         this.$axios.get(axiosUrl.baseUrl+"/category/getListByConditions").then((res) => {
          console.log(123);
          if (res.data.status) {
           return this.listCategory = res.data.categories;
          } else {
            return this.listCategory = [];
          }
        }).catch((error) => {
          console.log(error);
        });
      }, 30000)
    },
    watchTransaction : async function(orderBill_id){
      this.dialog3 = !this.dialog3
      this.transaction.type = 'Giao dịch';
      this.transaction.info = 'Danh sách account';
      await this.$axios.get(axiosUrl.baseUrl+"/accountSale?order_bill_id="+orderBill_id).then((res) => {
        console.log(res.data);
        if(res.data.isSuccess) {
          this.listAccountEmail = res.data.data;
          this.transaction.type = 'Giao dịch';
          this.transaction.info = 'Danh sách account';
          this.stringArea = this.convertTextArea();
        }

      }).catch((error) => {
        console.log(error);
      });
    },

    deleteTransaction : async function(orderBill_id){
      this.snackbar = true
      await this.$axios.delete(axiosUrl.baseUrl+"/orderBill/"+orderBill_id).then((res) => {
        console.log(res.data);
        if(res.data.isSuccess) {
          this.text = "Xóa thành công";
          this.transactionUser();
        }
        else{
          this.text = "Xóa không thành công";
        }

      }).catch((error) => {
        console.log(error);
      });
    },

    closeDialog : async function(orderBill_id){
      this.dialog3=false;
      this.stringArea ='';
    },
    async loading() {
      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide()
      }, 4000);
    }
  },
}
</script>

<style scoped>
.btn-register {
  width: 100px;
}

.login {
  padding: 25px;
}

.header_h2 {
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: center
}

.label-text {
  font-size: 20px;
  color: red;
  margin-bottom: 15px;
  font-family: sans-serif;
  font-weight: bold
}
</style>
