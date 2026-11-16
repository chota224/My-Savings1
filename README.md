# My Savings

A mobile-friendly personal savings tracker (installable progressive web app).

## Features
- PIN lock using a salted PBKDF2 password hash (4–6 digits)
- Starter challenge: save K800 by 30 November 2026
- Create multiple savings goals
- Record deposits and withdrawals with dates and notes
- Transaction history and recent activity
- Savings summary and six-month chart
- Monthly CSV report
- JSON backup and restore
- Offline support after the first successful load

## Publish with GitHub Pages
1. Open this repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then click **Save**.
5. Wait a few minutes for GitHub to publish the site. The Pages address will appear on that screen.
6. Open the published address on your phone in Chrome. Use the browser menu and choose **Install app** or **Add to Home screen**.

## Privacy
The PIN is stored as a salted password hash, but savings records are stored in browser local storage and are not encrypted. This is an app access lock, not bank-grade security. Export backups regularly. Clearing browser data may erase records.
