# How to use

```javascript
const userId = 'Starix1SW_4unxqibsyzyd_test'
const placeBetReq = generateBetData(userId)
console.log(JSON.stringify(placeBetReq, null, 2))

const placeBetRes = {
  "status": "0",
  "refId": "simulator_F6usa2CISK-5OIN",
  "licenseeTxId": "5850",
  "msg": ""
}
const confirmBetReq = getConfirmBetData(userId, placeBetRes);
console.log(JSON.stringify(confirmBetReq, null, 2))

const settleBetReq = getSettlleBetData(userId, confirmBetReq)
console.log(JSON.stringify(settleBetReq, null, 2))
```
