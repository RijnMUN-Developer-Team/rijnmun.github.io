# RijnMUN website
Instructions specifically for hosting with antagonist.nl.  

## Website

### Logging into Direct Admin
Go to https://rijnmun.org:2223/ 
    - username deb2001349 / password 3R61tDuSwEHGNNS4

### Domain and Server Stuff
- Make sure in the GitHub directory exists a CNAME pointing to custom domain name
- Make sure in Direct Admin > Account Manager > DNS Manager, there is a CNAME with value pointing to github pages

### Setting up SSH access 
1. `ssh-keygen -t rsa` in Linux terminal 
    - make sure the two keys end up under ~/.ssh
    - file name can be anything
    - can just leave passphrase blank for no passphrase

2. `cat ~/.ssh/antagonist.pub` 
    - or just somehow view file content of the public key
3. copy the public key starting with `ssh-rsa`
4. go to https://rijnmun.org:2223/ (Direct Admin) > extra features > Antagonist SSH
    - username deb2001349 / password 3R61tDuSwEHGNNS4
5. (If doing this for the first time) Add current IP > New Key > Paste in your public key OR (not the first time) just add the current IP to a current existing machine
6. back in the terminal, `ssh -i <private key location> deb2001349@rijnmun.org`

## Emails
### Creating new email accounts with @rijnmun.org endings + linking to gmail
1. Go to Direct Admin > Email Manager > Email Accounts
2. Create Account (can set all quotoas to max, remember the password)
3. Login to a gmail account that this email will be an alias of
4. In Gmail: 
    - Quick settings > see all settings > accounts and imports > check mail from another account > add a mail account
    - Email address is the @rijnmun.org ending email
    - Import emails from my other account (POP3)
    - Username: same as email address / Password: as set in Direct Admin in step 2
    - POP server: mail.antagonist.nl / Port 995
    - Check: leave a copy of retrieved message on the server (i.e. in mail.antagonist.nl) / Always use SSL / Label incoming messages (this is optional)
    - ADD ACCOUNT

5. Accept sending email too 
    - Name + treat as an alias
    - SMTP Server: mail.antagonist.nl / Port 587
    - Username is the email / Password: as set in Direct Admin in step 2
    - Secured connection using TLS
    - ADD ACCOUNT

6. Back in Gmail: in the confirmation email you just received, click on the link and click confirm (step repeated twice: once for receiving and once for sending)

7. Optional: mark as default sender
