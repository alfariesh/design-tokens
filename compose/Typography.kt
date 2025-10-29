// Typography.kt
// Do not edit directly, this file was auto-generated.

package com.app.tokens

import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

/**
 * Typography tokens
 * 
 * Font properties for text styling.
 * Use these tokens to build TextStyle objects in your composables.
 * 
 * Example:
 * Text(
 *   text = "Hello",
 *   fontSize = Typography.fontSizeLg,
 *   fontWeight = Typography.fontWeightBold,
 *   lineHeight = Typography.lineHeightLg
 * )
 */
object Typography {

    // Font families
    const val fontFamilyDisplay: String = "Bricolage Grotesque"
    const val fontFamilyText: String = "Inter"

    // Font sizes
    val fontSizeXs: TextUnit = 12.sp
    val fontSizeSm: TextUnit = 14.sp
    val fontSizeMd: TextUnit = 16.sp
    val fontSizeLg: TextUnit = 18.sp
    val fontSizeXl: TextUnit = 20.sp
    val fontSize2xl: TextUnit = 28.sp

    // Font weights
    val fontWeightRegular: FontWeight = FontWeight.W200
    val fontWeightMedium: FontWeight = FontWeight.W500
    val fontWeightSemibold: FontWeight = FontWeight.W700
    val fontWeightBold: FontWeight = FontWeight.W900

    // Line heights
    val lineHeightTextXs: TextUnit = 18.sp
    val lineHeightTextSm: TextUnit = 20.sp
    val lineHeightTextMd: TextUnit = 24.sp
    val lineHeightTextLg: TextUnit = 28.sp
    val lineHeightTextXl: TextUnit = 30.sp
    val lineHeightDisplayXs: TextUnit = 32.sp
    val lineHeightDisplaySm: TextUnit = 38.sp
    val lineHeightDisplayMd: TextUnit = 44.sp
    val lineHeightDisplayLg: TextUnit = 60.sp
    val lineHeightDisplayXl: TextUnit = 72.sp
    val lineHeightDisplay2xl: TextUnit = 90.sp

    // Letter spacing
    val letterSpacing0: TextUnit = -0.02.sp
    val letterSpacing1: TextUnit = 0.00.sp

}
