import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface myCallback {
  (path: string): void;
}

const FilesystemPage: React.FC = () => {
  const mkdir = async () => {
    try {
      let ret = await Filesystem.mkdir({
        path: 'secrets',
        directory: Directory.Documents,
        recursive: false,
      });
      console.log('Made dir', ret);
    } catch (e) {
      console.error('Unable to make directory', e);
    }
  };

  const rmdir = async () => {
    try {
      let ret = await Filesystem.rmdir({
        path: 'secrets',
        directory: Directory.Documents,
      });
      console.log('Removed dir', ret);
    } catch (e) {
      console.error('Unable to remove directory', e);
    }
  };

  const readdir = async () => {
    try {
      let ret = await Filesystem.readdir({
        path: 'secrets',
        directory: Directory.Documents,
      });
      console.log('Read dir', ret);
    } catch (e) {
      console.error('Unable to read dir', e);
    }
  };

  const fileWrite = async () => {
    try {
      const result = await Filesystem.writeFile({
        path: 'secrets/text.txt',
        data: 'This is a test',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log('Wrote file', result);
    } catch (e) {
      console.error('Unable to write file (press mkdir first, silly)', e);
    }
  };

  const fileRead = async () => {
    let contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log('file contents', contents.data);
  };

  const fileAppend = async () => {
    await Filesystem.appendFile({
      path: 'secrets/text.txt',
      data: 'MORE TESTS',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log('Appended');
  };

  const fileDelete = async () => {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
    console.log('Deleted');
  };

  const stat = async () => {
    try {
      let ret = await Filesystem.stat({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
      });
      console.log('STAT', ret);
    } catch (e) {
      console.error('Unable to stat file', e);
    }
  };

  const getUri = async () => {
    try {
      let ret = await Filesystem.getUri({
        path: 'text.txt',
        directory: Directory.Data,
      });
      alert(ret.uri);
    } catch (e) {
      console.error('Unable to stat file', e);
    }
  };

  const directoryTest = async () => {
    try {
      const result = await Filesystem.writeFile({
        path: 'text.txt',
        data: 'This is a test',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      console.log('wrote file', result);
      let stat = await Filesystem.stat({
        path: 'text.txt',
        directory: Directory.Data,
      });
      let data = await Filesystem.readFile({
        path: stat.uri,
      });
      console.log('Stat 1', stat);
      console.log(data);
      console.log('Stat 3', stat);
    } catch (e) {
      console.error('Unable to write file (press mkdir first, silly)', e);
    }
    console.log('Wrote file');
  };

  // Exercise the rename call
  const renameFileTest = async () => {
    console.log('Rename a file into a directory');
    await writeAll('fa');
    await mkdirAll('da');
    await Filesystem.rename({
      directory: Directory.Data,
      from: 'fa',
      to: 'da/fb',
    });
    await deleteAll('da/fb');
    await rmdirAll('da');
    console.log('rename finished');
  };

  // Exercise the copy call
  const copyFileTest = async () => {
    console.log('Copy a file into a directory');
    await writeAll('fa');
    await mkdirAll('da');
    await Filesystem.copy({
      directory: Directory.Data,
      from: 'fa',
      to: 'da/fb',
    });
    await deleteAll(['fa', 'da/fb']);
    await rmdirAll('da');
    console.log('copy finished');
  };

  const requestPermissions = async () => {
    const result = await Filesystem.requestPermissions();
    console.log('request permissions result', result);
  };

  const checkPermissions = async () => {
    const result = await Filesystem.checkPermissions();
    console.log('check permissions result', result);
  };

  const mkdirUrl = async () => {
    try {
      let uriResult = await Filesystem.getUri({
        path: 'myfolder',
        directory: Directory.Cache,
      });
      let ret = await Filesystem.mkdir({
        path: uriResult.uri,
        recursive: false,
      });
      console.log('Made dir', ret);
    } catch (e) {
      console.error('Unable to make directory', e);
    }
  };

  const rmdirUrl = async () => {
    try {
      let uriResult = await Filesystem.getUri({
        path: 'myfolder',
        directory: Directory.Cache,
      });
      let ret = await Filesystem.rmdir({
        path: uriResult.uri,
      });
      console.log('Removed dir', ret);
    } catch (e) {
      console.error('Unable to remove directory', e);
    }
  };

  const readdirUrl = async () => {
    try {
      let uriResult = await Filesystem.getUri({
        path: 'myfolder',
        directory: Directory.Cache,
      });
      let ret = await Filesystem.readdir({
        path: uriResult.uri,
      });
      console.log('Read dir', ret);
    } catch (e) {
      console.error('Unable to read dir', e);
    }
  };

  const fileWriteUrl = async () => {
    try {
      let uriResult = await Filesystem.getUri({
        path: 'myfolder/myfile.txt',
        directory: Directory.Cache,
      });
      const result = await Filesystem.writeFile({
        path: uriResult.uri,
        data: 'This is a test',
        encoding: Encoding.UTF8,
      });
      console.log('Wrote file', result);
    } catch (e) {
      console.error('Unable to write file (press mkdir first, silly)', e);
    }
  };

  const fileReadUrl = async () => {
    let uriResult = await Filesystem.getUri({
      path: 'myfolder/myfile.txt',
      directory: Directory.Cache,
    });
    let contents = await Filesystem.readFile({
      path: uriResult.uri,
      encoding: Encoding.UTF8,
    });
    console.log('file contents', contents.data);
  };

  const fileAppendUrl = async () => {
    let uriResult = await Filesystem.getUri({
      path: 'myfolder/myfile.txt',
      directory: Directory.Cache,
    });
    await Filesystem.appendFile({
      path: uriResult.uri,
      data: 'MORE TESTS',
      encoding: Encoding.UTF8,
    });
    console.log('Appended');
  };

  const fileDeleteUrl = async () => {
    let uriResult = await Filesystem.getUri({
      path: 'myfolder/myfile.txt',
      directory: Directory.Cache,
    });
    await Filesystem.deleteFile({
      path: uriResult.uri,
    });
    console.log('Deleted');
  };

  const statUrl = async () => {
    try {
      let uriResult = await Filesystem.getUri({
        path: 'myfolder/myfile.txt',
        directory: Directory.Cache,
      });
      let ret = await Filesystem.stat({
        path: uriResult.uri,
      });
      console.log('STAT', ret);
    } catch (e) {
      console.error('Unable to stat file', e);
    }
  };

  // Helper function to run the provided promise-returning function on a single item or array of items
  const doAll = async (item: string | string[], callback: myCallback) => {
    item = Array.isArray(item) ? item : [item];
    for (let i of item) {
      await callback(i);
    }
  };

  // Create many files
  const writeAll = (paths: string | string[]) => {
    return doAll(paths, path =>
      Filesystem.writeFile({
        directory: Directory.Data,
        path,
        data: path,
        encoding: Encoding.UTF8,
      }),
    );
  };

  // Delete many files
  const deleteAll = (paths: string | string[]) => {
    return doAll(paths, path =>
      Filesystem.deleteFile({
        directory: Directory.Data,
        path,
      }),
    );
  };

  // Create many directories
  const mkdirAll = (paths: string | string[]) => {
    return doAll(paths, path =>
      Filesystem.mkdir({
        directory: Directory.Data,
        path,
        recursive: true,
      }),
    );
  };

  // Remove many directories
  const rmdirAll = (paths: string | string[]) => {
    return doAll(paths, path =>
      Filesystem.rmdir({
        directory: Directory.Data,
        path,
      }),
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Directory</IonLabel>
            <IonButton expand="block" onClick={mkdir}>
              mk
            </IonButton>
            <IonButton expand="block" onClick={rmdir}>
              rm
            </IonButton>
            <IonButton expand="block" onClick={readdir}>
              read
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>File</IonLabel>
            <IonButton expand="block" onClick={fileWrite}>
              Write
            </IonButton>
            <IonButton expand="block" onClick={fileRead}>
              Read
            </IonButton>
            <IonButton expand="block" onClick={fileAppend}>
              Append
            </IonButton>
            <IonButton expand="block" onClick={fileDelete}>
              Delete
            </IonButton>
            <IonButton expand="block" onClick={stat}>
              stat
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Tests</IonLabel>
            <IonButton expand="block" onClick={getUri}>
              get Uri
            </IonButton>
            <IonButton expand="block" onClick={directoryTest}>
              directory
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>More Tests</IonLabel>
            <IonButton expand="block" onClick={renameFileTest}>
              rename File
            </IonButton>
            <IonButton expand="block" onClick={copyFileTest}>
              copy File
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Permissions</IonLabel>
            <IonButton expand="block" onClick={requestPermissions}>
              request
            </IonButton>
            <IonButton expand="block" onClick={checkPermissions}>
              check
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Directory with url</IonLabel>
            <IonButton expand="block" onClick={mkdirUrl}>
              mk
            </IonButton>
            <IonButton expand="block" onClick={rmdirUrl}>
              rm
            </IonButton>
            <IonButton expand="block" onClick={readdirUrl}>
              read
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>File url</IonLabel>
            <IonButton expand="block" onClick={fileWriteUrl}>
              Write
            </IonButton>
            <IonButton expand="block" onClick={fileReadUrl}>
              Read
            </IonButton>
            <IonButton expand="block" onClick={fileAppendUrl}>
              Append
            </IonButton>
            <IonButton expand="block" onClick={fileDeleteUrl}>
              Delete
            </IonButton>
            <IonButton expand="block" onClick={statUrl}>
              stat
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
