<template>
  <v-container class="grey lighten-5">
    <v-row
      no-gutters
    >
      <v-col md="3">

        <!--    register/login-->
        <v-row>
          <v-card class="login">
            <v-text-field
              v-model="login.username"
              :rules="rules"
              counter="25"
              hint="Nhập tên tài khoản"
            >
              <template v-slot:label>
                <div class="label-text">
                  Username
                </div>
              </template>
            </v-text-field>
            <v-text-field
              v-model="login.password"
              :rules="rules"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              counter="25"
              hint="Nhập mật khẩu"
              @click:append="showPass = !showPass"
              :type="showPass ? 'text' : 'password'"
              label="password"
            >
              <template v-slot:label>
                <div class="label-text">
                  Password
                </div>
              </template>
            </v-text-field>
            <div>
              <v-btn color="primary" @click="userLogin()">Đăng nhập</v-btn>
              <v-btn color="#FF5722" class="btn btn-register">Đăng kí</v-btn>
            </div>
          </v-card>
        </v-row>

        <!--    diveder area-->
        <v-divider style="margin-top:25px;"></v-divider>

        <!--    info customer-->
        <v-row style="margin-top:15px;">
          <v-card style="width:88%;">
            <v-card-title style="justify-content: center;font-weight: bold" >NẠP TIỀN</v-card-title>
            <v-card-text>
              <v-tabs
                v-model="tab"
                background-color="white"
                dark
              >
                <v-tabs-slider color="black" ></v-tabs-slider>
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
                          <div style="font-size: 20px;color:red;margin-bottom: 15px;">
                            {{item.label}}
                          </div>
                        </template>
                      </v-text-field>
                      <v-text-field
                        readonly
                        v-model="item.nameReceive"
                      >
                        <template v-slot:label>
                          <div style="font-size: 20px;color:red;margin-bottom: 15px;">
                            Người nhận
                          </div>
                        </template>
                      </v-text-field>
                      <v-text-field
                        readonly
                        v-model="item.content"
                      >
                        <template v-slot:label>
                          <div style="font-size: 20px;color:red;margin-bottom: 15px;">
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
                          <div style="font-size: 20px;color:#ff0000;margin-bottom: 15px;">
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
              <p style="font-size:15px;color:red;margin-top:20px">*** Đặc biệt nạp >1TR sẽ được cộng thêm 10% vào tài khoản tại <a href="https://anycaptcha.com/">AnyCapcha</a></p>
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
            <v-card-title class="header_h2">{{ itemCategory.name }}</v-card-title>

            <v-data-table
              style="background-color: #dbdee0"
              table
              table-hover
              table-striped
              table-bordered
              :headers="headers"
              :items="itemCategory.categoryType"
              class="elevation-1 paddingForm my-border"

            >

            </v-data-table>
          </v-card>
        </v-row>

      </v-col>
    </v-row>
    <!--    diveder area-->
    <v-divider style="margin-top:25px;"></v-divider>
    <v-row>
      <v-card
        class="pa-2 rounded distance"
        outlined
        tile
        style="width:100%"

      >
        <v-card-title style="" class="header_h2">GIAO DỊCH CỦA BẠN</v-card-title>

        <v-data-table
          style="background-color: #dbdee0"
          table
          table-hover
          table-striped
          table-bordered
          :headers="headerTransaction"
          class="elevation-1 paddingForm my-border"

        >
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";
import axiosUrl from "../scripts/common/axios";
export default {
  name: "dashboard",
  asyncData() {
    console.log(axiosUrl.baseUrl+"/category/getListByConditions");
    return axios.get(axiosUrl.baseUrl+"/category/getListByConditions").then((res) => {
      if (res.data.status) {
        return {listCategory: res.data.categories};
      } else {
        return {listCategory: []};
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  data() {
    return {
      socket:  null,
      login:{
        username: '',
        password: '',

      },
      showPass: false,
      linkFace:'<a>https://www.facebook.com/daiphong.tran.140/</a>',
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
          value: "amount",
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
      headerTransaction:[
        {
          text: "Ngày ",
          value: "date",
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
          text: "Loại",
          value: "type",
          class: "blue lighten-2",
          align: "center",
        },
        {
          text: "Tiền",
          value: "price",
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
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
      tab: null,
      items: [
        {
          id: 1,
          label: 'Số tài khoản',
          stk: 15983177,
          nameReceive: 'Trần Đỗ Đại Phong',
          content: "Your username",
          feedback:'Nạp tiền qua VCB, nhập chính xác nội dung là tên tài khoản của bạn,hệ thống sẽ tự động cộng tiền sau 30s-1p (Nếu quá 5 phút tiền chưa vào tài khoản, vui lòng inbox '
        },
        {
          id: 2,
          label: 'Số điện thoại',
          stk: '0364720704',
          nameReceive: 'Trần Đỗ Đại Phong',
          content: "Your username",
          feedback:'Nạp tiền qua MOMO, nhập chính xác nội dung là tên tài khoản của bạn,hệ thống sẽ tự động cộng tiền sau 3-5p (Nếu quá 5 phút tiền chưa vào tài khoản, vui lòng inbox '
        }
      ],

    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })

        this.$router.push({name: 'dashboard'});

      } catch (err) {
        console.log(err)
      }
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
.header_h2{
  font-size: 25px;
  font-weight: bold;
  display:flex;
  justify-content: center
}
.label-text{
  font-size: 20px;
  color:red;margin-bottom: 15px;
  font-family:sans-serif;
  font-weight: bold
}
</style>
