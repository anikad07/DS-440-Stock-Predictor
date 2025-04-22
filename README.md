# Stock-Market-Predictor-Frontend

This project is the frontend of Stock-Market-Predictor, a website where you can see useful analysis of news articles and social media chatter about stocks. This project is built using React and Tailwind CSS.

We have built this based on the [Material Tailwind Dashboard React](https://www.creative-tim.com/product/material-tailwind-dashboard-react) template from Creative Tim.

## Table of Contents
- [Terminal Commands](#terminal-commands)
- [File Structure](#file-structure)
- [Licensing](#licensing)

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `npm install` or `yarn install` or `pnpm install` to install our local dependencies.
3. Open a new tab in terminal and navigate to the backend folder.
4. Run `pip install pyenv` 
5. Run `pyenv install 3.11.6`
6. Run `python3 -m vent stock-lstm`
7. Run `source stock-lstm/bin/activate` to create the environment (in the future after already created you can activate it by running `pyenv activate stock-lstm`)
8. Run `pip freeze > requirements.txt`
9. Run `pip install -r requirements.txt`
10. Run `python -m pip install flask`, `python -m pip install numpy`, `python -m pip install tensorflow`, and `python -m pip install scikit-learn`
11. Run `python predict_api.py`.
12. Open a new tab in terminal and navigate to the backend folder.
13. Run `npm install express cors`
14. Run `node server.js`.
15. Navigate back to the first tab.
16. Run `npm run dev` or `yarn dev` or `pnpm dev` to start the local development server.
17. Copy and paste the link into your browser.

DISCLAIMER: If you run into any issues after searching for a stock, it is likely due to the OpenRouter API key expiring after certain usage or time constraints. To fix this, you can navigate to the [OpenRouter website](openrouter.ai) and sign up for a free account to create an API key. Once you have created a key, you can navigate to the backend folder and run `vi .env`. Where it says OpenRouter key, replace with your own. Restart the three running programs by pressing control + c, and then re-run the commands (steps 11, 14, and 16). This should fix the issue. 

### What's included

Within the download you'll find the following directories and files:

```
material-tailwind-dashboard-react
    ├── public
    │   ├── css
    │   └── img
    ├── src
    │   ├── configs
    │   ├── context
    │   ├── data
    │   ├── layouts
    │   ├── pages
    │   ├── widgets
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── routes.jsx
    ├── backend
    │   ├── .python-version
    │   ├── minimal.js
    │   ├── package.json
    │   ├── predict_api.py
    │   ├── server.js
    ├── .gitignore
    ├── CHANGELOG.md
    ├── index.html
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE
    ├── package.json
    ├── postcsss.config.cjs
    ├── prettier.config.cjs
    ├── README.md
    ├── tailwind.config.cjs
    └── vite.config.js
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">



## Licensing

- Copyright 2023 [Creative Tim](https://www.creative-tim.com?ref=readme-mtdr)
- Creative Tim [license](https://www.creative-tim.com/license?ref=readme-mtdr)

