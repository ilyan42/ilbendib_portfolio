# Configuration EmailJS pour le formulaire de contact

## Étapes pour configurer EmailJS :

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit
- Connectez-vous à votre dashboard

### 2. Configurer un service email
- Dans le dashboard, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre provider (Gmail recommandé)
- Suivez les instructions pour connecter votre compte Gmail
- Notez le **Service ID** généré (ex: `service_abc123`)

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Configurez votre template avec les variables suivantes :

```
Subject: Nouveau message depuis votre portfolio - {{firstName}} {{lastName}}

Body:
Vous avez reçu un nouveau message depuis votre portfolio :

Nom: {{firstName}} {{lastName}}
Email: {{email}}
Téléphone: {{phone}}

Message:
{{message}}

---
Envoyé depuis votre portfolio
```

- Notez le **Template ID** généré (ex: `template_xyz789`)

### 4. Obtenir votre clé publique
- Allez dans "Account" > "General"
- Copiez votre **Public Key** (ex: `user_abcdef123456`)

### 5. Mettre à jour le code JavaScript
Dans le fichier `js/index.js`, remplacez les valeurs suivantes :

```javascript
// Ligne 305 environ
emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique

// Ligne 327 environ
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Par exemple :
```javascript
emailjs.init("user_abcdef123456");
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Configuration Gmail (recommandée)

1. **Activer l'authentification à deux facteurs** sur votre compte Gmail
2. **Générer un mot de passe d'application** :
   - Allez dans les paramètres de votre compte Google
   - Sécurité > Authentification à deux facteurs
   - Mots de passe des applications
   - Générez un nouveau mot de passe pour "EmailJS"
3. **Utiliser ce mot de passe** lors de la configuration du service dans EmailJS

## Test du formulaire

Une fois configuré :
1. Ouvrez votre portfolio dans un navigateur
2. Remplissez le formulaire de contact
3. Cliquez sur "Submit"
4. Vérifiez votre boîte mail pour le message de test

## Limites du plan gratuit

- 200 emails par mois
- Marquage "Sent via EmailJS" dans les emails
- Support communautaire

Pour plus d'emails ou supprimer la signature, considérez le plan payant.

## Dépannage

Si les emails ne sont pas envoyés :
1. Vérifiez la console du navigateur pour les erreurs
2. Assurez-vous que toutes les IDs sont correctes
3. Vérifiez que le service Gmail est bien connecté
4. Testez avec un template simple d'abord

## Sécurité

- Votre clé publique peut être visible dans le code source
- C'est normal et sécurisé avec EmailJS
- Ne partagez jamais votre clé privée
