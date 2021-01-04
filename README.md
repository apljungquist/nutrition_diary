## Data

See `schema.py`

## UI

UI:
* Navbar
* FastsPage | FoodsPage | MealsPage

Navbar:
* FastsLink -> FastsPage
* FoodsLink -> FoodsPage
* MealsLink -> MealsPage

FastsPage:
* Motivational infographic
* Frequently used actions
    * Copy existing
    * Create new
* History
    
FoodsPage:
* Entertaining infographic
* Frequently used actions
    * Copy existing
    * Create new
* History
* Not sure if this page makes sense since foods do not exist independently of meals in the current schema.
  Would be nice thought to be able to create foods before adding them to meals or other food.
  One could have a default meal that all new foods are added too.

MealsPage:
* Motivational infographic
* Frequently used actions
    * Copy existing
    * Create new
* History

History:
* Name (does this make sense for fasts and meals?)
* When: 
* Summary
  * Fasts: goal, outcome, time
  * Foods: energy,  macros
  * Meals: energy, macros, time
* Actions
    * Copy
    * Edit
    
Copy (existing):
* Is a text field with suggestions
* Creates temporary item from deep copy of existing and opens create item modal

Create new:
* Is a button
* Creates temporary item from defaults and opens create item modal

Edit:
* Is a button
* Opens edit item modal

Create item modal,
Edit item modal:
* Is modal with form
* Lets user recursively edit item, commits tree on submit
* Only difference between create and edit is the title