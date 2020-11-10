package com.capacitorjs.testapp;

import android.os.Bundle;

import com.capacitorjs.plugins.actionsheet.ActionSheetPlugin;
import com.capacitorjs.plugins.app.AppPlugin;
import com.capacitorjs.plugins.applauncher.AppLauncherPlugin;
import com.capacitorjs.plugins.clipboard.ClipboardPlugin;
import com.capacitorjs.plugins.camera.CameraPlugin;
import com.capacitorjs.plugins.device.DevicePlugin;
import com.capacitorjs.plugins.dialog.DialogPlugin;
import com.capacitorjs.plugins.haptics.HapticsPlugin;
import com.capacitorjs.plugins.keyboard.KeyboardPlugin;
import com.capacitorjs.plugins.screenreader.ScreenReaderPlugin;
import com.capacitorjs.plugins.share.SharePlugin;
import com.capacitorjs.plugins.statusbar.StatusBarPlugin;
import com.capacitorjs.plugins.storage.StoragePlugin;
import com.capacitorjs.plugins.textzoom.TextZoomPlugin;
import com.capacitorjs.plugins.network.NetworkPlugin;
import com.capacitorjs.plugins.toast.ToastPlugin;
import com.capacitorjs.plugins.browser.BrowserPlugin;
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
      add(ActionSheetPlugin.class);
      add(AppPlugin.class);
      add(AppLauncherPlugin.class);
      add(ClipboardPlugin.class);
      add(CameraPlugin.class);
      add(DevicePlugin.class);
      add(DialogPlugin.class);
      add(HapticsPlugin.class);
      add(KeyboardPlugin.class);
      add(ScreenReaderPlugin.class);
      add(SharePlugin.class);
      add(StatusBarPlugin.class);
      add(StoragePlugin.class);
      add(TextZoomPlugin.class);
      add(ToastPlugin.class);
      add(NetworkPlugin.class);
      add(BrowserPlugin.class);
    }});
  }
}
