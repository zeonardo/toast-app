
# Leonardo Lima: Toasts

  
![Expected screen output](https://github.com/zeonardo/tast-app/blob/master/src/assets/toasts.png)


## Applications and repositories

* Challenge page: [deployed toast-app](https://zeonardo.github.io/toast-app)
* Toast repo: [toast-app on GitHUb](https://github.com/zeonardo/toast-app)

  

## Required Tasks
  
1. ✅ Create a standalone Toasts component that is responsible for showing notifications on the page.
2. ✅ The Toasts component should take in a configuration of various parameters.
3. A toast should contain A
  a. ✅ **Title** - To display the notification content
  b. ✅ **Icon** - Display relevant icons
  c. ✅ **Position** - Where the notification should be shown on the page.
4. ✅ All the configurations are editable and are present at the center of the page, as shown in the illustration above.
5. ✅ A Toast should have a close icon - which when pressed should remove the toast from the DOM.
6. ✅ If there are multiple toasts, they&#39;re neatly stacked on top of each other.

### Bonus Tasks

7. ⏳ Take in a duration parameter, after the specific duration has passed, the notification should be removed automatically.


### Extra Miles

- Basic [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) with "tab key" navigation and [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) roles
- Basic styling with [Tailwind](https://tailwindcss.com/) library (TODO: use Theme!)

###

## Available Scripts


In the project directory, you can run:

  

### `yarn start` or `npm start` (*yarn preferred*)

  

Runs the app in development mode.

Open [http://localhost:3000/toast-app](http://localhost:3000/toast-app) to view it in your browser.

The page will reload when you make changes to the code.

You may also see any lint errors in the console.

 

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode. _(TODO)_

  

### `yarn build` or `npm run build`

Builds the app for production into the `build` folder.
The build is minified and the filenames include the hashes.
