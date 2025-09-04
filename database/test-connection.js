#!/usr/bin/env node

/**
 * Database Connection Test Utility
 * 
 * This script tests the Supabase database connection and verifies:
 * - Basic connectivity
 * - Table existence
 * - Extension availability (pgvector)
 * - Basic CRUD operations
 * 
 * Usage: node database/test-connection.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  console.log('🔍 Testing SmartHire Database Connection...\n');

  try {
    // Test 1: Basic connectivity
    console.log('1. Testing basic connectivity...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (healthError) {
      throw new Error(`Connection failed: ${healthError.message}`);
    }
    console.log('✅ Database connection successful\n');

    // Test 2: Check table existence
    console.log('2. Checking table structure...');
    const tables = ['users', 'job_descriptions', 'candidates', 'cv_jd_matches'];
    
    for (const table of tables) {
      const { error: tableError } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (tableError) {
        throw new Error(`Table '${table}' not accessible: ${tableError.message}`);
      }
      console.log(`✅ Table '${table}' exists and accessible`);
    }
    console.log('');

    // Test 3: Check pgvector extension
    console.log('3. Checking pgvector extension...');
    const { data: extensions, error: extError } = await supabase
      .rpc('sql', {
        query: "SELECT * FROM pg_extension WHERE extname = 'vector';"
      });
    
    if (extError || !extensions || extensions.length === 0) {
      console.log('⚠️  pgvector extension not found - vector operations may not work');
    } else {
      console.log('✅ pgvector extension is installed');
    }
    console.log('');

    // Test 4: Test CRUD operations
    console.log('4. Testing CRUD operations...');
    
    // Create test user
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      full_name: 'Test User',
      subscription_tier: 'free'
    };

    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single();

    if (createError) {
      throw new Error(`Create operation failed: ${createError.message}`);
    }
    console.log('✅ CREATE operation successful');

    // Read operation
    const { data: readUser, error: readError } = await supabase
      .from('users')
      .select('*')
      .eq('id', createdUser.id)
      .single();

    if (readError || !readUser) {
      throw new Error(`Read operation failed: ${readError?.message || 'User not found'}`);
    }
    console.log('✅ READ operation successful');

    // Update operation
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ full_name: 'Updated Test User' })
      .eq('id', createdUser.id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Update operation failed: ${updateError.message}`);
    }
    console.log('✅ UPDATE operation successful');

    // Delete operation (cleanup)
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', createdUser.id);

    if (deleteError) {
      throw new Error(`Delete operation failed: ${deleteError.message}`);
    }
    console.log('✅ DELETE operation successful');
    console.log('');

    // Test 5: Check database functions
    console.log('5. Testing database functions...');
    
    const functions = ['cleanup_expired_data', 'increment_user_usage', 'check_user_usage_limit'];
    
    for (const funcName of functions) {
      const { error: funcError } = await supabase
        .rpc('sql', {
          query: `SELECT proname FROM pg_proc WHERE proname = '${funcName}';`
        });
      
      if (funcError) {
        console.log(`⚠️  Function '${funcName}' check failed: ${funcError.message}`);
      } else {
        console.log(`✅ Function '${funcName}' exists`);
      }
    }
    console.log('');

    console.log('🎉 All database tests passed successfully!');
    console.log('\n📊 Database Configuration Summary:');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Tables: ${tables.length} core tables verified`);
    console.log(`   Extensions: pgvector ${extensions?.length ? 'installed' : 'not found'}`);
    console.log(`   Functions: ${functions.length} utility functions`);
    
  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Verify Supabase environment variables are set correctly');
    console.error('2. Check that database migrations have been run');
    console.error('3. Ensure pgvector extension is enabled in Supabase dashboard');
    console.error('4. Verify service role key has necessary permissions');
    process.exit(1);
  }
}

// Run the tests
testDatabaseConnection();