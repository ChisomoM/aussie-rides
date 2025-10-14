import admin from 'firebase-admin';

// Initialize Firebase Admin SDK once (server-only)
let app: admin.app.App | undefined;

function initAdmin() {
  if (admin.apps && admin.apps.length) {
    app = admin.apps[0]!;
    return app;
  }

  // Support two modes for credentials:
  // 1) FIREBASE_SERVICE_ACCOUNT env containing JSON string of the service account
  // 2) GOOGLE_APPLICATION_CREDENTIALS pointing to a file (handled by the SDK)

  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  const gpath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  // Provide a clearer error early if no credentials appear to be configured.
  if (!sa && !gpath) {
    const msg = 'No Firebase Admin credentials found. Set FIREBASE_SERVICE_ACCOUNT (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON file) in the environment.';
    // Log prominently and throw so initialization fails fast instead of timing out in network calls.
    console.error('[firebaseAdmin] ' + msg);
    throw new Error(msg);
  }

  const options: admin.AppOptions = {};

  if (sa) {
    try {
      const parsed = JSON.parse(sa);
      options.credential = admin.credential.cert(parsed as admin.ServiceAccount);
    } catch {
      // fallback to default credential if parsing fails
      console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT, falling back to default credentials.');
    }
  }

  app = admin.initializeApp(options);
  return app;
}

export function getAdminApp() {
  if (!app) initAdmin();
  return app!;
}

export const adminAuth = () => getAdminApp()!.auth();

const firebaseAdmin = { getAdminApp, adminAuth };
export default firebaseAdmin;
