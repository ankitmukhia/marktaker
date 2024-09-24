## Wanna try out pleae follow below to set it up.

### Clone Project
```bash
 https://github.com/your-name/marktaker.git
```
### Changing Directory 
```bash
 cd marktaker
```
### Install Packages
```bash
  pnpm install
```
### At root level copy .env.exmple to .env
```bash
  cp .env.example .env
```
### Setup Clerk
This is where you can go [here](https://clerk.com/docs/quickstarts/setup-clerk) for more information.
Set up your environment keys to test your app locally. 

### Set Up ngrok for Clerk Webhooks
1. Install ngrok from [ngrok.com](https://ngrok.com/download).
2. Run ngrok to expose your app:
   ```bash
    ngrok http http://localhost:3000
   ```
3. Update webhook endpoint url
   ```bash
    https://<random-string>.ngrok.io/ -> along with your backend  endpoint /api/webhook
   ```
4. For more detailed information, please go [here](https://clerk.com/docs/integrations/webhooks/sync-data#sync-clerk-data-to-your-application-with-webhooks)

### Start project
```bash
  pnpm dev
```
