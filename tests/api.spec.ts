import { test, expect } from '@playwright/test';
import {Pet} from '/Users/shahardvora/playwright/classes/Pet.ts';

const post_pet_url = 'https://petstore.swagger.io/v2/pet'
const get_pet_url = 'https://petstore.swagger.io/v2/pet/'


function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomFourDigitNumber(): number {
  return getRandomInt(1000, 10000);
}

let id = generateRandomFourDigitNumber();
let error_value = 1234;

let pet_example = {
  "id": id,
  "category": {
    "id": 1,
    "name": "dog_test"
  },
  "name": "mokie",
  "photoUrls": [
    "123"
  ],
  "tags": [
    {
      "id": 0,
      "name": "pic"
    }
  ],
  "status": "available"
};

let pet = new Pet(pet_example)

test.describe('Test suite for Add pet to the store and get data from the store.', () =>{
    test('Adding pet to store', async ({request}) => {
          await test.step('save pet details', async ()=> {
              const response = await request.post(post_pet_url, {
                data: {
                  pet_example
              }
                  
              });
              expect(response.ok()).toBeTruthy();
              const data = await response.json();
              console.log(data) 
          })
      })

    test('check if pet added to the store', async ({request}) => {
      await test.step('get pet data', async ()=> {
        const response = await request.get(get_pet_url+3);
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        console.log(data);
      })
    })

    test('add pet without data.', async ({request}) => {
      
      await test.step('verification of error 415 from server.', async ()=> {
          const response = await request.post(post_pet_url, {
          //   data: {
          //     null:null
              
          // }
              
          });
          expect(response.status()).toBe(415);
          const data = await response.json();
          console.log(data) 
      })
  })

    test('add invalid json.', async ({request}) => {
        
      await test.step('verification of error 500 from server.', async ()=> {
          const response = await request.post(post_pet_url, {
            data: 
              error_value
          
              
          });
          expect(response.status()).toBe(500);
          const data = await response.json();
          console.log(data) 
      })
  })

  test('add array instead of json.', async ({request}) => {
        
    await test.step('verification of error 500 from server.', async ()=> {
        const response = await request.post(post_pet_url, {
          data: 
            []
        
            
        });
        expect(response.status()).toBe(500);
        const data = await response.json();
        console.log(data) 
    })
})

})
