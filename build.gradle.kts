import groovy.json.JsonBuilder
import org.gradle.api.publish.maven.MavenPublication


val rootGroup = "com.example.my.library"
val rootVersion = "0.0.5-SNAPSHOT"

buildscript {

    extra.set("kotlin_version", "1.3.72")
    extra.set("kotlin_logging_version", "1.7.9")
    extra.set("coroutines_version", "0.23.3")
    extra.set("koltinxSerializationVersion", "0.20.0")
    extra.set("rules_version", "3.2.4-SNAPSHOT")
    extra.set("mockkVersion", "1.9")
    /*

     kotlin_version = '1.3.72'
        kotlin_logging_version = "1.7.9"
        coroutines_version ="0.23.3"
        koltinxSerializationVersion = "0.20.0"
        rules_version ="3.2.4-SNAPSHOT"
        mockkVersion = "1.9"
     */
}

plugins {
    kotlin("multiplatform") version "1.3.72"
    id("maven-publish")
    jacoco

}
allprojects {
    this.group = rootGroup
    this.version = rootVersion
    buildscript {

        extra.set("kotlin_version", "1.3.72")
        extra.set("kotlin_logging_version", "1.7.9")
        extra.set("coroutines_version", "0.23.3")
        extra.set("koltinxSerializationVersion", "0.20.0")
        extra.set("rules_version", "3.2.4-SNAPSHOT")
        extra.set("mockkVersion", "1.9")
        /*

         kotlin_version = '1.3.72'
            kotlin_logging_version = "1.7.9"
            coroutines_version ="0.23.3"
            koltinxSerializationVersion = "0.20.0"
            rules_version ="3.2.4-SNAPSHOT"
            mockkVersion = "1.9"
         */
    }
    repositories {
        maven(url = "https://packagecloud.io/sarahBuisson/snapshot/maven2")
        google()
        jcenter()
        mavenCentral()
    }

}

subprojects { 

	if(name=="gameRules"){
    		val scriptsDirectory = "https://raw.githubusercontent.com/sarahBuisson/kotlin-multiplatform-multiproject-sample/master/gradle/scripts/";
    	apply(from = "${scriptsDirectory}/kotlinMultiNpm.gradle.kts")
    	apply(from = "${scriptsDirectory}/github.gradle.kts")
	}
}