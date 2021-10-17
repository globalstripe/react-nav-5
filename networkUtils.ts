import NetInfo, { NetInfoStateType, NetInfoState } from '@react-native-community/netinfo';


export enum NetworkError {
  unknown = 'unknown',
  noNetwork = 'noNetwork',
  mobileNetwork = 'mobileNetwork',
}

export interface NetCheckResult {
  didPass: boolean;
  netState: NetInfoState | null;
  failureReason?: NetworkError;
}

const getSizeOfRemoteFile = async (fileUrl: string): Promise<number | null> => {
  console.log('Checking remote file size');

  let size: number | null = null;

  try {
    const result = await fetch(fileUrl, {
      method: 'HEAD',
      mode: 'cors',
    });

    size = Number.parseInt(result.headers.get('content-length') ?? '-1');
    //console.log('LENGTH: ', result.headers.get('content-length'));
    if (size <= 0) size = null;
  } catch (error) {}

  return size;
};

const checkNetwork = async (localOnly: boolean, allowMobileNetwork: boolean): Promise<NetCheckResult> => {
  const result: NetCheckResult = {
    didPass: false,
    netState: null,
  };

  // Try and get the network details.
  try {
    result.netState = await NetInfo.fetch();
  } catch (error) {
    console.log('GameHelper:checkNetwork:networkState:' + error.code, error.message, error);
  }

  // If we managed to get a networkState try to check that a) we have a connection and b) we're on something other than cellular.
  if (result.netState) {
    // If we're not in local only mode and we don't have a connection then we can exit here.
    if (!localOnly && !result.netState.isConnected) {
      result.failureReason = NetworkError.noNetwork;
      return result;
    }

    // If we haven't been told to use mobile network, then exit here.
    if (!allowMobileNetwork && result.netState.type === NetInfoStateType.cellular) {
      result.failureReason = NetworkError.mobileNetwork;
      return result;
    }
  }

  result.didPass = true;
  return result;
};

export const NetworkUtils = {
  getSizeOfRemoteFile,
  checkNetwork,
};
