/**
 * TEST: Image Pipeline Diagnostic Instrumentation
 *
 * Tests all 5 diagnostic stages without modifying actual image processing
 * Verifies data capture at each stage
 */

console.log('='.repeat(80));
console.log('🔍 IMAGE PIPELINE DIAGNOSTIC TEST SUITE');
console.log('='.repeat(80));

// Test 1: Verify debug system initialization
console.log('\n📋 TEST 1: Debug System Initialization');
if (typeof _psImageDebug !== 'undefined') {
  console.log('✅ _psImageDebug object exists');
  console.log('   - enabled:', _psImageDebug.enabled);
  console.log('   - stages keys:', Object.keys(_psImageDebug.stages));
  console.log('   - blobs keys:', Object.keys(_psImageDebug.blobs));
} else {
  console.error('❌ _psImageDebug object not found');
}

// Test 2: Verify debug helper functions exist
console.log('\n📋 TEST 2: Debug Helper Functions');
const helpers = ['_psDebugStage1Original', '_psDebugStage2Rembg', '_psDebugStage3Bounds',
                 '_psDebugStage4CroppedCutout', '_psDebugStage5Canvas', '_psShowImageDebugPanel', '_psLogImageDebugData'];
helpers.forEach(h => {
  if (typeof window[h] === 'function') {
    console.log(`✅ ${h} exists`);
  } else {
    console.error(`❌ ${h} not found`);
  }
});

// Test 3: Test Stage 1 capture
console.log('\n📋 TEST 3: Stage 1 - Original Source Capture');
if (_psImageDebug.enabled) {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  _psDebugStage1Original(mockFile, 1920, 1440, 'image/jpeg');
  if (_psImageDebug.stages.stage1_original) {
    console.log('✅ Stage 1 data captured:');
    console.log('   - fileName:', _psImageDebug.stages.stage1_original.fileName);
    console.log('   - naturalWidth:', _psImageDebug.stages.stage1_original.naturalWidth);
    console.log('   - naturalHeight:', _psImageDebug.stages.stage1_original.naturalHeight);
    console.log('   - aspectRatio:', _psImageDebug.stages.stage1_original.aspectRatio.toFixed(3));
  } else {
    console.error('❌ Stage 1 data not captured');
  }
} else {
  console.log('⏭️  Skipping Stage 1 test (debug mode disabled)');
}

// Test 4: Test Stage 2 capture
console.log('\n📋 TEST 4: Stage 2 - rembg Response Capture');
if (_psImageDebug.enabled) {
  const mockResponse = {
    status: 200,
    headers: new Map([['content-type', 'application/json']])
  };
  const alphaStats = {
    alphaMin: 0,
    alphaMax: 255,
    transparentPercent: 25.5,
    translucentCount: 12800
  };
  _psDebugStage2Rembg(mockResponse, null, 1600, 1600, true, alphaStats);
  if (_psImageDebug.stages.stage2_rembg) {
    console.log('✅ Stage 2 data captured:');
    console.log('   - httpStatus:', _psImageDebug.stages.stage2_rembg.httpStatus);
    console.log('   - detectedFormat:', _psImageDebug.stages.stage2_rembg.detectedFormat);
    console.log('   - imageWidth:', _psImageDebug.stages.stage2_rembg.imageWidth);
    console.log('   - hasAlpha:', _psImageDebug.stages.stage2_rembg.hasAlpha);
  } else {
    console.error('❌ Stage 2 data not captured');
  }
} else {
  console.log('⏭️  Skipping Stage 2 test (debug mode disabled)');
}

// Test 5: Test Stage 3 capture
console.log('\n📋 TEST 5: Stage 3 - Visible Bounds Capture');
if (_psImageDebug.enabled) {
  const mockImg = { width: 1600, height: 1600 };
  const mockBounds = {
    left: 100,
    top: 150,
    width: 1400,
    height: 1300,
    aspect: 1.077,
    hasTransparency: true,
    usedFallback: false,
    padding: { leftPct: 2.5, rightPct: 2.5, topPct: 3.0, bottomPct: 3.0 }
  };
  _psDebugStage3Bounds(mockImg, mockBounds);
  if (_psImageDebug.stages.stage3_bounds) {
    console.log('✅ Stage 3 data captured:');
    console.log('   - sourceWidth:', _psImageDebug.stages.stage3_bounds.sourceWidth);
    console.log('   - boundsWidth:', _psImageDebug.stages.stage3_bounds.boundsWidth);
    console.log('   - retainedPercent:', _psImageDebug.stages.stage3_bounds.retainedPercentOfOriginal);
    console.log('   - transparencyDetected:', _psImageDebug.stages.stage3_bounds.transparencyDetected);
    console.log('   - fallbackToFullImage:', _psImageDebug.stages.stage3_bounds.fallbackToFullImage);
  } else {
    console.error('❌ Stage 3 data not captured');
  }
} else {
  console.log('⏭️  Skipping Stage 3 test (debug mode disabled)');
}

// Test 6: Test Stage 4 capture
console.log('\n📋 TEST 6: Stage 4 - Cropped Cutout Capture');
if (_psImageDebug.enabled) {
  _psDebugStage4CroppedCutout(1400, 1300, 100, 150, 42, true);
  if (_psImageDebug.stages.stage4_cropped) {
    console.log('✅ Stage 4 data captured:');
    console.log('   - outputWidth:', _psImageDebug.stages.stage4_cropped.outputWidth);
    console.log('   - outputHeight:', _psImageDebug.stages.stage4_cropped.outputHeight);
    console.log('   - cropStartX:', _psImageDebug.stages.stage4_cropped.cropStartX);
    console.log('   - paddingApplied:', _psImageDebug.stages.stage4_cropped.paddingApplied);
  } else {
    console.error('❌ Stage 4 data not captured');
  }
} else {
  console.log('⏭️  Skipping Stage 4 test (debug mode disabled)');
}

// Test 7: Test Stage 5 capture
console.log('\n📋 TEST 7: Stage 5 - Canvas Composition Capture');
if (_psImageDebug.enabled) {
  _psDebugStage5Canvas(1200, 1200, 1400, 1300, 0.857, 0.923, 600, 600, false, 'JPEG', 0.92);
  if (_psImageDebug.stages.stage5_canvas) {
    console.log('✅ Stage 5 data captured:');
    console.log('   - canvasWidth:', _psImageDebug.stages.stage5_canvas.canvasWidth);
    console.log('   - objectOriginalWidth:', _psImageDebug.stages.stage5_canvas.objectOriginalWidth);
    console.log('   - scaleFactor:', _psImageDebug.stages.stage5_canvas.scaleFactor.toFixed(3));
    console.log('   - outputFormat:', _psImageDebug.stages.stage5_canvas.outputFormat);
    console.log('   - jpegQuality:', _psImageDebug.stages.stage5_canvas.jpegQuality);
  } else {
    console.error('❌ Stage 5 data not captured');
  }
} else {
  console.log('⏭️  Skipping Stage 5 test (debug mode disabled)');
}

// Test 8: Verify diagnostic function accessibility
console.log('\n📋 TEST 8: Diagnostic Function Accessibility');
if (_psImageDebug.enabled) {
  console.log('✅ Diagnostic functions ready for manual testing');
  console.log('   To test manually:');
  console.log('   1. Open the app with ?imageDebug=1 in the URL');
  console.log('   2. Upload a photo using "📷 Take Photo FRONT/BACK"');
  console.log('   3. Generate pack images using "🎁 Generar Imágenes de Pack"');
  console.log('   4. Click "📊 Show Image Pipeline Debug Data" button');
  console.log('   5. Review all 5 stages of diagnostic data');
} else {
  console.log('⏭️  Debug mode not enabled. Add ?imageDebug=1 to enable');
}

// Test 9: Error handling
console.log('\n📋 TEST 9: Error Handling');
console.log('✅ Error array initialized:', Array.isArray(_psImageDebug.errors));
console.log('   Current errors:', _psImageDebug.errors.length);

// Summary
console.log('\n' + '='.repeat(80));
console.log('✅ DIAGNOSTIC TEST SUITE COMPLETE');
console.log('='.repeat(80));

if (_psImageDebug.enabled) {
  console.log('\n🔍 DEBUG MODE IS ACTIVE');
  console.log('📊 Next steps:');
  console.log('   1. Process a photo through the app');
  console.log('   2. Generate pack images');
  console.log('   3. Click "Show Image Pipeline Debug Data"');
  console.log('   4. Review all diagnostic data');
  console.log('   5. Screenshot or copy the debug data');
} else {
  console.log('\n⚠️  Debug mode is DISABLED');
  console.log('To enable: Add ?imageDebug=1 to the URL');
  console.log('Example: https://app.example.com/?imageDebug=1');
}

// Export test results
window._psTestResults = {
  timestamp: new Date().toISOString(),
  debugEnabled: _psImageDebug.enabled,
  stage1Captured: !!_psImageDebug.stages.stage1_original,
  stage2Captured: !!_psImageDebug.stages.stage2_rembg,
  stage3Captured: !!_psImageDebug.stages.stage3_bounds,
  stage4Captured: !!_psImageDebug.stages.stage4_cropped,
  stage5Captured: !!_psImageDebug.stages.stage5_canvas,
  errorCount: _psImageDebug.errors.length
};

console.log('\n📋 Test results available at: window._psTestResults');
