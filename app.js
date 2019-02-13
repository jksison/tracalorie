// Storage Controller


// Item Controller
const ItemCtrl = (function() {
   // Item Constructor
   const Item = function(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calorie = calories;
   };

   // Data Structure / State
   const data = {
      items: [
         {id: 0, name: 'Steak Dinner', calorie: 1200},
         {id: 1, name: 'Cookie', calorie: 400},
         {id: 2, name: 'Egg', calorie: 300}
      ],
      currentItem: null,
      totalCalories: 0
   };

   // Public methods
   return {
      getItems: function() {
         return data.items;
      },
      addItem: function(name, calories) {
         let ID;
         
         // Create ID
         if(data.items.length > 0) {
            ID = data.items[data.items.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Calories to number
         calories = parseInt(calories);
         
         // Create new item
         newItem = new Item(ID, name, calories);

         // Add to items array
         data.items.push(newItem);

         // Update total calories
         data.totalCalories += calories;

         return newItem;
      },
      getTotalCalories: function() {
         return data.totalCalories;
      },
      logData: function() {
         return data;
      }
   };
})();



// UI Controller
const UICtrl = (function() {
   const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
   }

   // Public methods
   return {
      populateItemList: function(items) {
         const self = this;
         items.forEach(function(item) {
            // Add item
            const newItem = ItemCtrl.addItem(item.name, item.calorie);
            console.log(newItem);
            self.addListItem(newItem);
         });
      },
      getItemInput: function() {
         return {
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
         }
      },
      addListItem: function(item){
         // Show the list
         document.querySelector(UISelectors.itemList).style.display = 'block';

         // Create li element
         const li = document.createElement('li');
         
         // Add class
         li.className = 'collection-item';
         
         // Add ID
         li.id = `item-${item.id}`;

         // Add HTML
         li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
            <a href="#" class="secondary-content">
               <i class="edit-item fa fa-pencil"></i>
            </a>`;
            
         // Insert item
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      },
      clearInput: function() {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      hideList: function() {
         document.querySelector(UISelectors.itemList).style.display = 'none';
      },
      showTotalCalories: function(totalCalories) {
         const node = document.querySelector(UISelectors.totalCalories);
         node.innerText = totalCalories;
      },
      getSelectors: function() {
         return UISelectors;
      }
   };
})();



// App Controller
const App = (function() {
   // Load event listeners
   const loadEventListeners = function() {
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();

      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

   }


   // Add item submit
   const itemAddSubmit = function(e) {
      // Get form input from UI controller
      const input = UICtrl.getItemInput();

      // Check for name and calorie input
      if(input.name !== '' && input.calories !== ''){
         // Add item
         const newItem = ItemCtrl.addItem(input.name, input.calories);
         
         // Add item to UI list
         UICtrl.addListItem(newItem);

         // Get total calories
         const totalCalories = ItemCtrl.getTotalCalories();
         // Add total calories to UI
         UICtrl.showTotalCalories(totalCalories);

         // Clear fields
         UICtrl.clearInput();
      }

      e.preventDefault();
   }

   // Public methods
   return {
      init: function() {
         // Fetch item from data structure
         const items = ItemCtrl.getItems();

         // Check if any items
         if(items.length === 0) {
            UICtrl.hideList();
         } else {
            // Populate list with items
            UICtrl.populateItemList(items);
            UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
         }

         // Load event listeners
         loadEventListeners();
      }
   };
})(ItemCtrl, UICtrl);



// Initialize App
App.init();