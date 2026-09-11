package com.myapp

import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.clearquote.assessment.cq_sdk.CQSDKInitializer
import io.clearquote.assessment.cq_sdk.datasources.remote.network.datamodels.createQuoteApi.payload.ClientAttrs
import io.clearquote.assessment.cq_sdk.models.CustomerDetails
import io.clearquote.assessment.cq_sdk.models.InputDetails
import io.clearquote.assessment.cq_sdk.models.QuoteData
import io.clearquote.assessment.cq_sdk.models.UserFlowParams
import io.clearquote.assessment.cq_sdk.models.VehicleDetails
import io.clearquote.assessment.cq_sdk.singletons.others.PublicConstants

class ClearQuoteModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        instance = this
    }

    override fun getName(): String = MODULE_NAME

    @ReactMethod
    fun initSDK(key: String, promise: Promise) {
        try {
            val initializer = CQSDKInitializer(reactApplicationContext)
            UiThreadUtil.runOnUiThread {
                initializer.initSDK(sdkKey = key) { isInitialized, code, message ->
                    val result = Arguments.createMap().apply {
                        putBoolean("isInitialized", isInitialized)
                        putInt("code", code)
                        putString("message", message)
                    }
                    promise.resolve(result)
                }
            }
        } catch (e: Exception) {
            promise.reject("INIT_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun startInspection(
        clientAttrs: ReadableMap?,
        inputDetails: ReadableMap?,
        userFlowParams: ReadableMap?,
        promise: Promise,
    ) {
        try {
            val activity = reactApplicationContext.currentActivity
            val initializer = CQSDKInitializer(reactApplicationContext)

            if (!initializer.isCQSDKInitialized()) {
                promise.reject("InspectionError", "SDK is not initialized yet")
                return
            }
            if (activity == null) {
                promise.reject("ActivityError", "Activity is null")
                return
            }

            UiThreadUtil.runOnUiThread {
                initializer.startInspection(
                    activity,
                    makeClientAttrs(clientAttrs),
                    makeInputDetails(inputDetails),
                    makeUserFlowParams(userFlowParams),
                ) { started, message, code, _ ->
                    val result = Arguments.createMap().apply {
                        putBoolean("started", started)
                        putString("message", message)
                        putInt("code", code)
                    }
                    promise.resolve(result)
                }
            }
        } catch (e: Exception) {
            promise.reject("InspectionError", e.message, e)
        }
    }

    @ReactMethod
    fun logout() {
        CQSDKInitializer(reactApplicationContext).logOut()
    }

    @ReactMethod
    fun manualOfflineSync() {
        CQSDKInitializer(reactApplicationContext).triggerOfflineSync()
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getDealerCode(): String? {
        val dealerCode = CQSDKInitializer(reactApplicationContext).getUserDetails().dealerCode
        return dealerCode.takeIf { it.isNotBlank() }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getSDKVersion(): String {
        return CQSDKInitializer.sdkVersionName
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun isSDKInitialized(): Boolean {
        return CQSDKInitializer(reactApplicationContext).isCQSDKInitialized()
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for NativeEventEmitter on Android.
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for NativeEventEmitter on Android.
    }

    private fun emitInspectionCompletion(payload: WritableMap) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(EVENT_INSPECTION_COMPLETION, payload)
    }

    companion object {
        const val MODULE_NAME = "ClearQuoteModule"
        const val EVENT_INSPECTION_COMPLETION = "inspectionCompletionStatus"

        @Volatile
        private var instance: ClearQuoteModule? = null

        fun emitInspectionCompletion(intent: Intent) {
            val identifier = intent.getStringExtra(
                PublicConstants.quoteCreationFlowStatusIdentifierKeyInIntent,
            ) ?: return

            val payload = Arguments.createMap().apply {
                putString("identifier", identifier)
                putString(
                    "message",
                    intent.getStringExtra(PublicConstants.quoteCreationFlowStatusMsgKeyInIntent),
                )
                putInt(
                    "code",
                    intent.getIntExtra(PublicConstants.quoteCreationFlowStatusCodeKeyInIntent, 0),
                )
                putBoolean("isOffline", false)
                putNullableString(
                    "serverQuoteId",
                    intent.getStringExtra(PublicConstants.quoteCreationFlowStatusQuoteIdKeyInIntent),
                )
                putNullableString(
                    "serverInspectionId",
                    intent.getStringExtra(
                        PublicConstants.quoteCreationFlowStatusInspectionRequestIdKeyInIntent,
                    ),
                )
            }
            instance?.emitInspectionCompletion(payload)
        }

        private fun WritableMap.putNullableString(key: String, value: String?) {
            if (value.isNullOrBlank()) {
                putNull(key)
            } else {
                putString(key, value)
            }
        }

        private fun makeClientAttrs(map: ReadableMap?): ClientAttrs? {
            if (map == null) return null
            return ClientAttrs(
                userName = map.optionalString("userName"),
                dealer = map.optionalString("dealer"),
                dealerIdentifier = map.optionalString("dealerIdentifier"),
                client_unique_id = map.optionalString("client_unique_id"),
                organisationId = map.optionalString("organisationId"),
            )
        }

        private fun makeInputDetails(map: ReadableMap?): InputDetails? {
            if (map == null) return null
            val customerMap = map.optionalMap("customerDetails")
            val vehicleMap = map.optionalMap("vehicleDetails")
            val quoteMap = map.optionalMap("quoteData")
            return InputDetails(
                vehicleDetails = vehicleMap?.let {
                    VehicleDetails(
                        regNumber = it.optionalString("regNumber"),
                        make = it.optionalString("make"),
                        model = it.optionalString("model"),
                        bodyStyle = it.optionalString("bodyStyle"),
                        fuelType = it.optionalString("fuelType"),
                        variant = it.optionalString("variant"),
                    )
                },
                customerDetails = customerMap?.let {
                    CustomerDetails(
                        name = it.optionalString("name"),
                        email = it.optionalString("email"),
                        dialCode = it.optionalString("dialCode"),
                        phoneNumber = it.optionalString("phoneNumber"),
                    )
                },
                quoteData = quoteMap?.let {
                    QuoteData(
                        inspectionType = it.optionalString("inspectionType"),
                        fleetImageType = it.optionalString("fleetImageType"),
                    )
                },
            )
        }

        private fun makeUserFlowParams(map: ReadableMap?): UserFlowParams? {
            if (map == null) return null
            return UserFlowParams(
                isOffline = map.optionalBoolean("isOffline"),
                skipInputPage = map.optionalBoolean("skipInputPage"),
            )
        }

        private fun ReadableMap.optionalString(key: String): String? {
            if (!hasKey(key) || isNull(key)) return null
            return getString(key)
        }

        private fun ReadableMap.optionalBoolean(key: String): Boolean? {
            if (!hasKey(key) || isNull(key)) return null
            return getBoolean(key)
        }

        private fun ReadableMap.optionalMap(key: String): ReadableMap? {
            if (!hasKey(key) || isNull(key)) return null
            return getMap(key)
        }
    }
}
