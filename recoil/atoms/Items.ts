import { atom } from "recoil";


export const Items = atom({
  key: "Itemss",
  default: [{
    amount: 0,
    category:'',
    description:'',
    image:'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif',
    name:''
  }],
});
