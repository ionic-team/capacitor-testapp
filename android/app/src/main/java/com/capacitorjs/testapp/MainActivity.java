package com.capacitorjs.testapp;

import android.os.Bundle;

import com.capacitorjs.plugins.screenreader.ScreenReaderPlugin;
import com.capacitorjs.plugins.textzoom.TextZoomPlugin;
import com.capacitorjs.plugins.network.NetworkPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(ScreenReaderPlugin.class);
      add(TextZoomPlugin.class);
      add(NetworkPlugin.class);
    }});
  }
}
