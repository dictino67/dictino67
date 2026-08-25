<?php
$successMessage = '';
$errorMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = trim($_POST['nom'] ?? '');
    $prenom = trim($_POST['prenom'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $gsm = trim($_POST['gsm'] ?? '');

    if ($nom === '' || $prenom === '' || $email === '' || $gsm === '') {
        $errorMessage = 'Veuillez remplir tous les champs.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = 'Veuillez saisir une adresse mail valide.';
    } else {
        $successMessage = 'Merci ' . htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8') . ', votre formulaire a bien &eacute;t&eacute; envoy&eacute;.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire de contact</title>
    <style>
        :root {
            color-scheme: light;
            --ink: #17221b;
            --muted: #627067;
            --paper: #f6f4ed;
            --panel: #ffffff;
            --accent: #176b52;
            --accent-dark: #0e4e3c;
            --line: #d9e0d9;
            --error: #a12f2f;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            color: var(--ink);
            background: radial-gradient(circle at top left, #dce9dd 0, transparent 38%), var(--paper);
            font-family: Georgia, 'Times New Roman', serif;
        }

        main {
            width: min(100%, 560px);
            padding: clamp(28px, 6vw, 56px);
            background: var(--panel);
            border: 1px solid var(--line);
            box-shadow: 0 18px 50px rgba(23, 34, 27, 0.1);
        }

        .eyebrow {
            margin: 0 0 10px;
            color: var(--accent);
            font: 700 0.75rem/1.2 Arial, sans-serif;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0 0 28px;
            font-size: clamp(2rem, 6vw, 3.25rem);
            line-height: 1;
            font-weight: 400;
        }

        form { display: grid; gap: 18px; }

        label {
            display: grid;
            gap: 7px;
            color: var(--muted);
            font: 700 0.85rem/1.2 Arial, sans-serif;
        }

        input {
            width: 100%;
            padding: 13px 14px;
            border: 1px solid var(--line);
            border-radius: 2px;
            color: var(--ink);
            background: #fbfcfa;
            font: 1rem Georgia, 'Times New Roman', serif;
        }

        input:focus {
            outline: 2px solid rgba(23, 107, 82, 0.25);
            border-color: var(--accent);
        }

        button {
            margin-top: 8px;
            padding: 14px 18px;
            border: 0;
            border-radius: 2px;
            color: #fff;
            background: var(--accent);
            cursor: pointer;
            font: 700 0.9rem Arial, sans-serif;
            transition: background 160ms ease, transform 160ms ease;
        }

        button:hover { background: var(--accent-dark); }
        button:active { transform: translateY(1px); }

        .message {
            margin: 0 0 22px;
            padding: 12px 14px;
            font: 0.92rem/1.45 Arial, sans-serif;
        }

        .success { color: var(--accent-dark); background: #e8f3eb; }
        .error { color: var(--error); background: #fbeaea; }
    </style>
</head>
<body>
    <main>
        <p class="eyebrow">Contact</p>
        <h1>Vos coordonn&eacute;es</h1>

        <?php if ($successMessage !== ''): ?>
            <p class="message success" role="status"><?= $successMessage ?></p>
        <?php elseif ($errorMessage !== ''): ?>
            <p class="message error" role="alert"><?= htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8') ?></p>
        <?php endif; ?>

        <form method="post" action="">
            <label for="nom">
                Nom
                <input type="text" id="nom" name="nom" value="<?= htmlspecialchars($_POST['nom'] ?? '', ENT_QUOTES, 'UTF-8') ?>" required>
            </label>

            <label for="prenom">
                Pr&eacute;nom
                <input type="text" id="prenom" name="prenom" value="<?= htmlspecialchars($_POST['prenom'] ?? '', ENT_QUOTES, 'UTF-8') ?>" required>
            </label>

            <label for="email">
                Adresse mail
                <input type="email" id="email" name="email" value="<?= htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8') ?>" required>
            </label>

            <label for="gsm">
                GSM
                <input type="tel" id="gsm" name="gsm" value="<?= htmlspecialchars($_POST['gsm'] ?? '', ENT_QUOTES, 'UTF-8') ?>" required>
            </label>

            <button type="submit">Envoi</button>
        </form>
    </main>
</body>
</html>
