if(document.fonts) {
  // Define a new FontFace
  const notoSansRegular = new FontFace('Noto Sans Regular', 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/144736/NotoSans-Regular.woff2), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/144736/NotoSans-Regular.woff)');
  //console.log(notoSansRegular);

  // Add the FontFace to the FontFaceSet
  document.fonts.add(notoSansRegular);

  // Get the current status of the FontFace
  // (should be 'unloaded')
  console.info('Current status', notoSansRegular.status);

  // Load the FontFace
  notoSansRegular.load();

  // Get the current status of the Fontface
  // (should be 'loading' or 'loaded' if cached)
  console.info('Current status', notoSansRegular.status);

  // Wait until the font has been loaded, log the current status.
  notoSansRegular.loaded.then((fontFace) => {
    console.info('Current status', fontFace.status);
    console.log(fontFace.family, 'loaded successfully.');
    
    // Add a class to the body element
    document.body.classList.add('noto-regular-loaded');
    
  // Throw an error if loading wasn't successful
  }, (fontFace) => {
    console.error('Current status', notoSansRegular.status);
  });

  // Track if all fonts (if there are multiple) have been loaded
  // The 'ready' promise resolves if this is the case
  document.fonts.ready.then((fontFaceSet) => {
    console.log(fontFaceSet.size, 'FontFaces loaded.');
  });
  
} else {
  console.error('Sorry, unsupported browser');
}