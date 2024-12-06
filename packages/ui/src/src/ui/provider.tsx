/**
 * A component that provides Adobe Typekit fonts for personal projects.
 * This component is locked to personal use only as it contains specific fonts
 * and CSS styles that are tied to a personal Adobe Typekit account.
 *
 * @internal This component should not be used by other developers
 * @returns A Link element that loads personal Adobe Typekit fonts
 */
function UIProvider({ key }: { key: string }) {
  if (key === "samma") {
    return <link href="https://use.typekit.net/nib2aic.css" rel="stylesheet" />;
  }
  return null;
}

export default UIProvider;