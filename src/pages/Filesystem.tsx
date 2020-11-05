import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import {
  Filesystem,
  FilesystemDirectory,
  FilesystemEncoding,
} from '@capacitor/filesystem';

interface myCallback {
  (path: string): void;
}

const FilesystemPage: React.FC = () => {
  const mkdir = async () => {
    try {
      let ret = await Filesystem.mkdir({
        path: 'secrets',
        directory: FilesystemDirectory.Documents,
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
        directory: FilesystemDirectory.Documents,
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
        directory: FilesystemDirectory.Documents,
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
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      });
      console.log('Wrote file', result);
    } catch (e) {
      console.error('Unable to write file (press mkdir first, silly)', e);
    }
  };

  const fileRead = async () => {
    let contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
    console.log('file contents', contents.data);
  };

  const fileAppend = async () => {
    await Filesystem.appendFile({
      path: 'secrets/text.txt',
      data: 'MORE TESTS',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
    console.log('Appended');
  };

  const fileDelete = async () => {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents,
    });
    console.log('Deleted');
  };

  const stat = async () => {
    try {
      let ret = await Filesystem.stat({
        path: 'secrets/text.txt',
        directory: FilesystemDirectory.Documents,
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
        directory: FilesystemDirectory.Data,
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
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8,
      });
      console.log('wrote file', result);
      let stat = await Filesystem.stat({
        path: 'text.txt',
        directory: FilesystemDirectory.Data,
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
    await Filesystem.rename({ from: 'fa', to: 'da/fb' });
    await deleteAll('da/fb');
    await rmdirAll('da');
  };

  // Exercise the copy call
  const copyFileTest = async () => {
    console.log('Copy a file into a directory');
    await writeAll('fa');
    await mkdirAll('da');
    await Filesystem.copy({ from: 'fa', to: 'da/fb' });
    await deleteAll(['fa', 'da/fb']);
    await rmdirAll('da');
  };

  const requestPermissions = async () => {
    const result = await Filesystem.requestPermissions();
    console.log('request permissions result', result);
  };

  const checkPermissions = async () => {
    const result = await Filesystem.checkPermissions();
    console.log('check permissions result', result);
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
        path,
        data: path,
        encoding: FilesystemEncoding.UTF8,
      }),
    );
  };

  // Delete many files
  const deleteAll = (paths: string | string[]) => {
    return doAll(paths, path => Filesystem.deleteFile({ path }));
  };

  // Create many directories
  const mkdirAll = (paths: string | string[]) => {
    return doAll(paths, path =>
      Filesystem.mkdir({
        path,
        recursive: true,
      }),
    );
  };

  // Remove many directories
  const rmdirAll = (paths: string | string[]) => {
    return doAll(paths, path => Filesystem.rmdir({ path }));
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
        <IonButton expand="block" onClick={mkdir}>
          mk dir
        </IonButton>
        <IonButton expand="block" onClick={rmdir}>
          rm dir
        </IonButton>
        <IonButton expand="block" onClick={readdir}>
          read dir
        </IonButton>
        <IonButton expand="block" onClick={fileWrite}>
          file Write
        </IonButton>
        <IonButton expand="block" onClick={fileRead}>
          file Read
        </IonButton>
        <IonButton expand="block" onClick={fileAppend}>
          file Append
        </IonButton>
        <IonButton expand="block" onClick={fileDelete}>
          file Delete
        </IonButton>
        <IonButton expand="block" onClick={stat}>
          stat
        </IonButton>
        <IonButton expand="block" onClick={getUri}>
          get Uri
        </IonButton>
        <IonButton expand="block" onClick={directoryTest}>
          directory Test
        </IonButton>
        <IonButton expand="block" onClick={renameFileTest}>
          rename File Test
        </IonButton>
        <IonButton expand="block" onClick={copyFileTest}>
          copy File Test
        </IonButton>
        <IonButton expand="block" onClick={requestPermissions}>
          request read/write permission
        </IonButton>
        <IonButton expand="block" onClick={checkPermissions}>
          check read/write permission
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
